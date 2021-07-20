import React, { Component } from 'react';
import apiClient from '../lib/apiClient';

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
							user={authProvider.user}
							logout={authProvider.logout}
							login={authProvider.login}
							signup={authProvider.signup}
							updateContactInfo={authProvider.updateContactInfo}
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
			user: null,
		};
	}

	async componentDidMount() {
		try {
			const user = await apiClient.profile();
			this.setState({
				status: 'loggedIn',
				user,
			});
		} catch (e) {
			this.setState({
				status: 'loggedOut',
				user: null,
			});
			console.log(e);
		}
	}

	login = async ({ email, password }) => {
		try {
			this.setState({
				status: 'loading',
				user: null,
			});
			const user = await apiClient.login({ email, password });
			this.setState({
				status: 'loggedIn',
				user,
			});
		} catch (e) {
			this.setState({
				status: 'loggedOut',
				user: null,
			});
		}
	};

	signup = async ({ email, password, name, specialty }) => {
		try {
			this.setState({
				status: 'loading',
				user: null,
			});
			const user = await apiClient.signup({ email, password, name, specialty });
			this.setState({
				status: 'loggedIn',
				user,
			});
		} catch (e) {
			this.setState({
				status: 'loggedOut',
				user: null,
			});
		}
	};

	updateContactInfo = async ({ email, phoneNr }) => {
		try {
			this.setState({
				status: 'loading',
				user: null,
			});
			const updatedUser = await apiClient.updateContactInfo({ email, phoneNr });
			await this.setState({
				status: 'loggedIn',
				user: updatedUser,
			});
		} catch (e) {}
	};

	logout = async () => {
		try {
			await apiClient.logout();
			this.setState({
				status: 'loggedOut',
				user: null,
			});
		} catch (e) {}
	};

	render() {
		const { user, status } = this.state;

		return (
			<Provider
				value={{
					isLoading: status === 'loading',
					isLoggedIn: status === 'loggedIn',
					isLoggedOut: status === 'loggedOut',
					user,
					login: this.login,
					signup: this.signup,
					logout: this.logout,
					updateContactInfo: this.updateContactInfo,
				}}
			>
				{this.props.children}
			</Provider>
		);
	}
}

export default AuthProvider;
