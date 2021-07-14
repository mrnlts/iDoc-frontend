import React, { Component } from 'react';

class Private extends Component {
	render() {
		const { email } = this.props.rest.user;
		return (
			<div>
				<h1>Welcome {email}</h1>
			</div>
		);
	}
}

export default Private;
