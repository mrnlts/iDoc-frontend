import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { withAuth } from './providers/AuthProvider';

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';

import Navbar from './components/Navbar';
import Main from './pages/Main';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import About from './pages/About';
import Profile from './pages/Profile';
import Appointments from './pages/Appointments';
import AddPatient from './pages/AddPatient';
import ClinicalHistory from './pages/ClinicalHistory';
import EditClinicalHistory from './pages/EditClinicalHistory';
class App extends Component {
	render() {
		const { isLoading, isLoggedIn } = this.props;

		if (isLoading) {
			return <div>loading ... </div>;
		}

		return (
			<div className="h-screen">
				<img src="./background.jpg" className="absolute opacity-50 z-m1 object-cover h-screen w-screen"/>
				<Navbar />
				<div>
					<Switch>
						<AnonRoute path="/about" component={About} />
						<AnonRoute path="/signup" component={Signup} />
						<AnonRoute path="/login" component={Login} />
						<PrivateRoute path="/home" component={Home} />
						<PrivateRoute path="/profile" component={Profile} />
						<PrivateRoute path="/appointments" component={Appointments} />
						<PrivateRoute path="/addpatient" component={AddPatient} />
						<PrivateRoute path="/:id/edit" component={EditClinicalHistory} />
						<PrivateRoute path="/:id" component={ClinicalHistory} />
						<AnonRoute path="/" component={Main} isLoggedIn={isLoggedIn} />
						</Switch>
				</div>
			</div>
		);
	}
}

export default withAuth(App);