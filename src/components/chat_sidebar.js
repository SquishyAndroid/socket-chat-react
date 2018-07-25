import React, { Component } from 'react';
import { Popover, IPopoverProps, PopoverInteractionKind, Position } from "@blueprintjs/core";
import ChatSettings from './chat_settings';

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
                    <Popover
                        popoverClassName="settings-popover"
                        minimal={true}
                        position={Position.BOTTOM_RIGHT}
                        content={<ChatSettings />}
                    >
                        <button><i className="fa fa-cog" aria-hidden="true"></i></button>
                    </Popover>
                </div>
            </div>
        );
    }
}