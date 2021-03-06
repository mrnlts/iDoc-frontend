import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCalendar, faHome, faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons';
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
		const { isLoggedIn } = this.props;
		try {
			if (isLoggedIn) {
				const user = await authClient.whoami();
				if (user) {
					return this.setState({ user, isLoading: false, hideNav: true });
				}
			}
			return this.setState({isLoading: false, hideNav: true})
		} catch (e) {
			return this.setState({isLoading: false, hideNav: true});
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
			<div className="flex bg-blue-300 p-4 sticky top-0 w-full ">
				<FontAwesomeIcon icon={faBars} className={`text-3xl ${!hideNav && "text-white"}`} onClick={ this.handleClick}/>
				<img src="./logo.png" className={`w-16 ml-28 ${!hideNav && "hidden"}`}/>
				{isLoggedIn ? (
					<div className={`${hideNav ? "hidden" : ""} w-full flex justify-around items-center text-white text-xl pl-5`}>
						<Link to="/home" onClick={this.handleClick}><FontAwesomeIcon icon={faHome} /></Link>
						{user.isPatient ? <Link to="/profile" onClick={this.handleClick}><button><FontAwesomeIcon icon={faUser} /></button></Link> : ''}
						<Link to="/appointments" onClick={this.handleClick}><button><FontAwesomeIcon icon={faCalendar} /></button></Link>
						<button onClick={logout}><FontAwesomeIcon icon={ faPowerOff} /></button>
					</div>
				) : (
					<div className={`${hideNav ? "hidden" : ""} w-4/5 flex justify-around items-center text-white text-xl pl-7`}>
						<Link to="/login" onClick={this.handleClick}>Log in</Link>
						<Link to="/signup" onClick={this.handleClick}>Sign up</Link>
						<Link to="/about" onClick={this.handleClick}>About</Link>
					</div>
				)}
			</div>
		);
	}
}

export default withAuth(Navbar);
