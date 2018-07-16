import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Chat from './chat';
import Home from './home';

export default class App extends Component {
	render() {
        return (
        	<Router>
				<Switch>
		    		<Route exact path='/' component={Home}/>
		    		<Route exact path='/:name?/:room?' component={Chat}/>
			  	</Switch>
			</Router>
        )
    }
}