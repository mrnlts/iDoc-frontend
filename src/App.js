import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Private from './pages/Private';
import Signup from './pages/Signup';
import Login from './pages/Login';
import About from './pages/About';
import { withAuth } from './providers/AuthProvider';

class App extends Component {
	render() {
		const { isLoading } = this.props;
		if (isLoading) {
			return <div>loading ... </div>;
		}

		return (
			<div className="container">
				<h1>iDoc</h1>
				<Navbar />
				<Switch>
					<Route path="/about" component={About} />
					<AnonRoute path="/signup" component={Signup} />
					<AnonRoute path="/login" component={Login} />
					<PrivateRoute path="/private" component={Private} />
				</Switch>
			</div>
		);
	}
}

export default withAuth(App);
