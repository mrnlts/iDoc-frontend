import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import authClient from '../lib/authClient';
import { withAuth } from '../providers/AuthProvider';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hideNav: true,
			user: undefined,
			isLoading: true
		}
	}

	async componentDidMount() {
		try {
			const user = await authClient.whoami();
			if (user) {
				return this.setState({ user, isLoading: false });
			}
		} catch (e) {
			console.log(e)
			return this.setState({isLoading: false});
		}
	}
	
	handleClick = () => {
		const { hideNav } = this.state;
		return this.setState({ hideNav: !hideNav });
	}

	render() {
		const { user, isLoading, hideNav } = this.state;
		const { isLoggedIn, logout } = this.props;
		
		if (isLoading) {
			return <div>loading ... </div>;
		}
		
		return (
			<div className="flex bg-blue-300">
				<FontAwesomeIcon icon={faBars} className="text-3xl" onClick={ this.handleClick}/>
				{isLoggedIn ? (
					<div className={`${!hideNav ? "hidden" : ""} w-4/5 flex justify-between`}>
						{user.isPatient ? <Link to="/profile"><button>My profile</button></Link> : ''}
						<Link to="/appointments"><button>My appointments</button></Link>
						<button onClick={logout}>Logout</button>
					</div>
				) : (
					<div className={`${!hideNav ? "hidden" : ""} w-4/5 flex justify-between`}>
						<Link to="/login">Login</Link>
						<Link to="/signup">Signup</Link>
						<Link to="/about">About</Link>
					</div>
				)}
			</div>
		);
	}
}

export default withAuth(Navbar);
