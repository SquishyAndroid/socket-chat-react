import React, { Component, Fragment } from 'react';
import ChatMessages from './chat_messages';
import ChatForm from './chat_form';
import ChatSidebar from './chat_sidebar';
import openSocket from 'socket.io-client';
const socket = openSocket();

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionId: this.generateSessionId(),
            name: '',
            room: '',
            message: {},
            message_list: [],
            users: []
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({ 
            name: params.name,
            room: params.room
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
        });

        socket.on('updateUserList', (users) => {
            this.setState({ users });
        });
    }

    componentWillUnmount() {
        socket.on('disconnect', () => {
            console.log('Disconnected from server');
            scrollToBottom();
        });
    }

    createMessage(text, imageData, sessionId) {
        socket.emit('createMessage', {
            text: text,
            imageData: imageData,
            sessionId: sessionId,
        });
    }

    userIsTyping() {
        socket.emit('userTyping');
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

    render() {
        return (
            <div className="chat">
                <ChatSidebar
                    users={this.state.users}
                />
                <div className="chat__main">
                    <ChatMessages 
                        sessionId={this.state.sessionId}
                        message={this.state.message}
                        messages={this.state.message_list}
                    />
                    <ChatForm 
                        sessionId={this.state.sessionId}
                        message={this.state.message}
                        createMessage={this.createMessage}
                        userIsTyping={this.userIsTyping}
                    />
                </div>
            </div>
        );
    }
}
