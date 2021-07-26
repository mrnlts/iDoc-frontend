import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import authClient from '../lib/authClient';

import { withAuth } from '../providers/AuthProvider';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			isLoading: true
		}
	}

	async componentDidMount() {
    const user = await authClient.whoami();
    this.setState({user, isLoading: false});
	}
	
	render() {
		const { user, isLoading } = this.state;
		const { isLoggedIn, logout } = this.props;
		
		if (isLoading) {
			return <div>loading ... </div>;
		}
		
		return (
			<div>
				{isLoggedIn ? (
					<>
						{user.isPatient ? <Link to="/profile"><button>My profile</button></Link> : ''}
						<Link to="/appointments"><button>My appointments</button></Link>
						<button onClick={logout}>Logout</button>
					</>
				) : (
					<>
						<Link to="/login">Login</Link>
						<Link to="/signup">Signup</Link>
						<Link to="/about">About</Link>
					</>
				)}
			</div>
		);
	}
}

export default withAuth(Navbar);
