import React, { Component } from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { getLinkToShare, bookmarkChat, removeBookmark } from './utils';
import { Link } from 'react-router-dom'

const popoverMenu = (
    <Popover id="popover-trigger-focus" title="Chat Settings">
        <button type="button" onClick={() => getLinkToShare()}>
            <i className="fas fa-link"></i> Share this Chatroom
        </button>
        <br /><br />
        <button type="button" onClick={() => bookmarkChat()}>
            <i className="fas fa-bookmark"></i> Bookmark Chatroom
        </button>
        <button type="button" onClick={() => removeBookmark()} className="alert-button">
            <i className="fas fa-trash-alt"></i> Remove Bookmark
        </button>
        <div className="back-button" style={{ marginTop: "40px" }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#2d9af3'}}>
                <i className="fa fa-chevron-left" aria-hidden="true"></i> Back to Home
            </Link>
        </div>
    </Popover>
);

export default class ChatSidebar extends Component {
	render() {
        return (
        	<div className="chat__sidebar">
                <h3>People</h3>
                <div id="users">
                	<ul>
	                	{this.props.users.map(user => {
	                		return (
	                			<li key={user}><i className="fas fa-user"></i> {user}</li>
	                		)
	                	})}
	                </ul>
                </div>
                <div className="settings">
                    <OverlayTrigger trigger="focus" placement="right" overlay={popoverMenu}>
                        <button type="button" trigger="focus" overlay={popoverMenu}>
                            <i className="fa fa-cog" aria-hidden="true"></i>
                        </button>
                    </OverlayTrigger>
                </div>
            </div>
        );
    }
}