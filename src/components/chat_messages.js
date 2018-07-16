import React, { Component } from 'react';
import moment from 'moment';

export default class ChatMessages extends Component {
	render() {
        return (
            <ul id="messages" className="chat__messages">
            	{this.props.messages.map(message => {
            		let formattedTime = moment(message.createdAt).format('h:mmA');
            		if (message.sessionId === sessionStorage.getItem("SessionId")) {
            			return (
	            			<li key={message.createdAt} className="message right">
	            				<div className="message__title">
	            					<h4>{message.from}</h4>
	            					<span>{formattedTime}</span>
	            				</div>
	            				<div className="message__body">
	            					<p>{message.text}</p>
	            					<img src={message.imageData} />
	            				</div>
	            			</li>
	            		)
            		} else {
            			return (
	            			<li key={message.createdAt} className="message left">
	            				<div className="message__title">
	            					<h4>{message.from}</h4>
	            					<span>{formattedTime}</span>
	            				</div>
	            				<div className="message__body">
	            					<p>{message.text}</p>
	            					<img src={message.imageData} />
	            				</div>
	            			</li>
	            		)
            		}
            	})}
            </ul>
        );
    }
}
