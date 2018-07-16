import React, { Component } from 'react';

export default class ChatSidebar extends Component {
	render() {
        return (
        	<div className="chat__sidebar">
                <h3>{this.props.room}</h3>
                <div id="users">
                	<ul>
	                	{this.props.users.map(user => {
	                		return (
	                			<li key={user}><i className="fas fa-user"></i> {user}</li>
	                		)
	                	})}
	                </ul>
                </div>
            </div>
        );
    }
}