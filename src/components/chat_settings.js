import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getLinkToShare, bookmarkChat, removeBookmark } from './utils';

export default class ChatSidebar extends Component {
	render() {
		return (
			<div id="popover">
		        <div className="popover-header">
		        	Settings
		        </div>
		        <div className="popover-body">
		            <div className="button-wrapper">
		                <button type="button" onClick={() => bookmarkChat()}>
		                    <i className="fas fa-bookmark"></i> Bookmark Chatroom
		                </button>
		            </div>
		            <div className="button-wrapper">
		                <button type="button" onClick={() => removeBookmark()} className="alert-button">
		                    <i className="fas fa-trash-alt"></i> Remove Bookmark
		                </button>
		            </div>
		            <div className="back-button" style={{ marginTop: "40px" }}>
		                <Link to="/" style={{ textDecoration: 'none', color: '#2d9af3'}}>
		                    <i className="fa fa-chevron-left" aria-hidden="true"></i> Back to Home
		                </Link>
		            </div>
		        </div>
		    </div>
		)
	}
}