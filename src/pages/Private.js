import React, { Component } from 'react';

class Private extends Component {
	render() {
		const { username } = this.props.rest.user;
		return (
			<div>
				<h1>Welcome {username}</h1>
			</div>
		);
	}
}

export default Private;
