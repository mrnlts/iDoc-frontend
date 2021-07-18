import React, { Component } from 'react';

class Private extends Component {
	render() {
		const { name, isProfessional } = this.props.rest.user;
		return (
			<div>
				<h1>{isProfessional ? `Welcome, Dr. ${name}` : `Welcome, ${ name }` }</h1>
			</div>
		);
	}
}

export default Private;
