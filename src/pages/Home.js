import React, { Component } from 'react';

class Home extends Component {
	render() {
		const { name, isProfessional, appointments } = this.props.rest.user;
		return (
			<div>
				<h1>Welcome, {isProfessional ? 'Dr. ' : ''}{name}</h1>
				<h2>{!appointments ? "You have no scheduled appointments at the moment" : "Here are your upcoming appointments:"}</h2>
				<ul>
					{appointments ? appointments.slice(0, 2).map((appointment, index) => <li key={index}>Date: {appointment.appointmentDate} <br /> Specialty: {appointment.professional.specialty} <br /> Professional: {appointment.professional.name}</li> ) : ''}
				</ul>
			</div>
		);
	}
}

export default Home;
