import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withAuth } from '../providers/AuthProvider';

class Navbar extends Component {
	render() {
		const { user, isLoggedIn, logout } = this.props;
		return (
			<div>
				{isLoggedIn ? (
					<>
						{user.isPatient ? <Link to="/profile"><button>My profile</button></Link> : ''}
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
