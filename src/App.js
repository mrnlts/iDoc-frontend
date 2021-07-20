import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomeRoute from './components/HomeRoute';
import AnonRoute from './components/AnonRoute';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import About from './pages/About';
import Profile from './pages/Profile';
import { withAuth } from './providers/AuthProvider';

class App extends Component {
	render() {
		const { isLoading, isLoggedIn } = this.props;
		if (isLoading) {
			return <div>loading ... </div>;
		}

		return (
			<div className="container">
				{isLoggedIn ? <Link to="/home"><h1>iDoc</h1></Link> : <Link to="/"><h1>iDoc</h1></Link>}
				<Navbar />
				<Switch>
					<Route path="/about" component={About} />
					<AnonRoute path="/signup" component={Signup} />
					<AnonRoute path="/login" component={Login} />
					<HomeRoute path="/home" component={Home} />
					<HomeRoute path="/profile" component={Profile} />
				</Switch>
			</div>
		);
	}
}

export default withAuth(App);
