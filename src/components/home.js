import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
        	name: this.getUserName(),
        	room: ''
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleRoomChange = this.handleRoomChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getUserName() {
        let name;
        if (localStorage.getItem("UserName")) {
            name = localStorage.getItem("UserName");
        } else {
            name: ''
        }
        return name;
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    handleRoomChange(event) {
    	this.setState({
            room: event.target.value
        });
    }

    handleSubmit(event) {
    	event.preventDefault();
    	localStorage.setItem("UserName", this.state.name);
    	window.location.href = `${this.state.name}/${this.state.room}`;
    }

    render() {
    	const isEnabled = this.state.name && this.state.room;
        return (
        	<div className="centered-form">
	            <div className="centered-form__form">
					<form id="join-form" onSubmit={this.handleSubmit}>
						<div className="form-field">
							<h3>Join a Chat</h3>
						</div>
						<div className="form-field">
							<label>Display name</label>
							<input value={this.state.name} onChange={this.handleNameChange} type="text" name="name" autoFocus autoComplete="off"/>
						</div>
						<div className="form-field">
							<label>Room name</label>
							<input value={this.state.room} onChange={this.handleRoomChange} type="text" name="room" autoComplete="off"/>
						</div>
						<div className="form-field">
							<button disabled={!isEnabled} type="submit">Join</button>
						</div>
					</form>
				</div>
			</div>
        );
    }
}
