import React, { Component } from 'react';
import authClient from '../lib/authClient';

const { Consumer, Provider } = React.createContext();

export const withAuth = Comp => {
	return class WithAuth extends Component {
		render() {
			return (
				<Consumer>
					{authProvider => (
						<Comp
							isLoading={authProvider.isLoading}
							isLoggedIn={authProvider.isLoggedIn}
							isLoggedOut={authProvider.isLoggedOut}
							logout={authProvider.logout}
							login={authProvider.login}
							signup={authProvider.signup}
							updateUser={authProvider.updateUser}
							{...this.props}
						/>
					)}
				</Consumer>
			);
		}
	};
};

class AuthProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: 'loading',
		};
	}

	async componentDidMount() {
		try {
			await authClient.whoami();
			this.setState({
				status: 'loggedIn',
			});
		} catch (e) {
			this.setState({
				status: 'loggedOut',
			});
			console.log(e);
		}
	}

	login = async ({ email, password }) => {
		try {
			this.setState({
				status: 'loading',
			});
			await authClient.login({ email, password });
			this.setState({
				status: 'loggedIn',
			});
		} catch (e) {
			this.setState({
				status: 'loggedOut',
			});
		}
	};

	signup = async ({ email, password, name, specialty }) => {
		try {
			this.setState({
				status: 'loading',
			});
			await authClient.signup({ email, password, name, specialty });
			this.setState({
				status: 'loggedIn',
			});
		} catch (e) {
			this.setState({
				status: 'loggedOut',
			});
		}
	};

	logout = async () => {
		try {
			await authClient.logout();
			this.setState({
				status: 'loggedOut',
			});
		} catch (e) {}
	};

	render() {
		const { status } = this.state;

		return (
			<Provider
				value={{
					isLoading: status === 'loading',
					isLoggedIn: status === 'loggedIn',
					isLoggedOut: status === 'loggedOut',
					login: this.login,
					signup: this.signup,
					logout: this.logout,
				}}
			>
				{this.props.children}
			</Provider>
		);
	}
}

export default AuthProvider;
