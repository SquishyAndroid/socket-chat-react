import React, { Component, Fragment } from 'react';
import ChatMessages from './chat_messages';
import ChatForm from './chat_form';
import ChatSidebar from './chat_sidebar';
import openSocket from 'socket.io-client';
import { Intent } from "@blueprintjs/core";
import { showToast } from './utils';
import Sidebar from 'react-sidebar';
const Favico = require('favico.js');

const socket = openSocket();
const mql = window.matchMedia(`(min-width: 800px)`);

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionId: this.generateSessionId(),
            name: '',
            room: '',
            message: {},
            message_list: [],
            users: [],
            alerts: 0,
            mql: mql,
            docked: props.docked,
            open: props.open
        }

        this.favicon = new Favico({
            animation: 'none'
        })

        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    componentDidMount() {
        mql.addListener(this.mediaQueryChanged);

        window.onfocus = () => { 
            this.favicon.badge(0);
            this.setState({ alerts: 0 });
        }

        const { match: { params } } = this.props;
        this.setState({ 
            name: params.name,
            room: params.room,
            mql: mql,
            sidebarDocked: mql.matches
        });

        socket.on('connect', () => {
            let params = {
                name: this.state.name,
                room: this.state.room
            }

            socket.emit('join', params, (err) => {
                if (err) {
                    alert(err);
                    window.location.href = "/";
                }
            });
        });

        socket.on('newMessage', (message) => {
            this.setState({
                message,
                message_list: this.state.message_list.concat(message)
            });
            this.scrollToBottom();
            this.updateBadgeIcon();
        });

        socket.on('updateUserList', (users) => {
            this.setState({ users });
        });

        socket.on('notification', (notif) => {
            showToast(notif.text, Intent.NONE);
        });

        socket.on('userTypingMessage', (notif) => {
            // console.log(notif);
        })
    }

    updateBadgeIcon() {
        if (this.state.sessionId !== this.state.message.sessionId) {
            this.state.alerts++;
            this.favicon.badge(this.state.alerts);
        }
    }

    componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
        socket.on('disconnect', () => {
            console.log('Disconnected from server');
            scrollToBottom();
        });
    }

    onSetSidebarOpen() {
        this.setState({sidebarOpen: open});
    }

    mediaQueryChanged() {
        this.setState({sidebarDocked: this.state.mql.matches});
    }

    createMessage(text, imageData, sessionId) {
        socket.emit('createMessage', {
            text: text,
            imageData: imageData,
            sessionId: sessionId,
        });
    }

    userIsTyping(name, room) {
        let params = {
            name: name,
            room: room
        }

        socket.emit('userTyping', params);
    }

    shuffleString(str) {
        var shuffledWord = '';
        str = str.split('');
        while (str.length > 0) {
          shuffledWord +=  str.splice(str.length * Math.random() << 0, 1);
        }
        return shuffledWord;
    }

    generateSessionId() {
        let sessionId;
        if (sessionStorage.getItem("SessionId")) {
            sessionId = sessionStorage.getItem("SessionId");
        } else {
            let date = new Date().getTime();
            sessionId = this.shuffleString(date.toString());
            sessionStorage.setItem("SessionId", sessionId);
        }
        return sessionId;
    }

    scrollToBottom() {
        let messages = document.getElementById('messages');
        let last_message = messages.lastElementChild;
        last_message.scrollIntoView();
    }

    toggleDrawer() {
        if (this.state.sidebarDocked) {
            this.setState({
                sidebarDocked: false
            });
            this.toggle.blur();
        } else {
            this.setState({
                sidebarDocked: true
            });
            this.toggle.blur();
        }
    }

    render() {
        const sidebarContent = <ChatSidebar users={this.state.users}/>;
        const sidebarProps = {
            sidebar: this.state.sidebarOpen,
            docked: this.state.sidebarDocked,
            onSetOpen: this.onSetSidebarOpen
        };

        return (
            <div className="chat">
                <Sidebar
                    sidebar={sidebarContent}
                    open={this.state.sidebarOpen}
                    docked={this.state.sidebarDocked}
                    onSetOpen={this.onSetSidebarOpen}
                >   
                    <div className="chat__main">
                        <button
                            className="side-drawer"
                            onClick={this.toggleDrawer}
                            ref={(toggle) => { this.toggle = toggle; }}
                        >
                            <i className="fas fa-bars"></i>
                        </button>
                        <ChatMessages 
                            sessionId={this.state.sessionId}
                            message={this.state.message}
                            messages={this.state.message_list}
                        />
                        <ChatForm
                            name={this.state.name}
                            room={this.state.room}
                            sessionId={this.state.sessionId}
                            message={this.state.message}
                            createMessage={this.createMessage}
                            userIsTyping={this.userIsTyping}
                        />
                    </div>
                </Sidebar>
            </div>
        );
    }
}
