import React, { Component } from 'react';
import { Link, Switch } from 'react-router-dom';
import { withAuth } from './providers/AuthProvider';

import Navbar from './components/Navbar';
import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';
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
			<div>		
				<Navbar />
				{isLoggedIn ? <Link to="/home"><h1  className="bg-gray-500 w-50">iDoc</h1></Link> : <Link to="/"><h1>iDoc</h1></Link>}
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
				</Switch>
			</div>
		);
	}
}

export default withAuth(App);