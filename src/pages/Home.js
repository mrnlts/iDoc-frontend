import React, { Component } from 'react';
import { withAuth } from "../providers/AuthProvider";
import patientClient from '../lib/patientClient';

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			isProfessional: '',
			appointments: '',
			isLoading: true,
		}
	}
	
	async componentDidMount() {
		const { name, isProfessional } = this.props.rest.user;
		const appointments = await patientClient.getAppointments();
		this.setState({name, isProfessional, appointments, isLoading: false})
	}

	render() {
		const { name, isProfessional, appointments, isLoading } = this.state;

		if (isLoading) {
			return <div>loading ... </div>;
		}
		return (
			<div>
				<h1>Welcome, {isProfessional ? 'Dr. ' : ''}{name}</h1>
				{!isProfessional ?
					<div>
						<h2>{appointments.length === 0 ? "You have no scheduled appointments at the moment" : "Here are 2 of your upcoming appointments:"}</h2>
						<ul> {appointments.length >= 1 ? appointments.slice(0, 2).map((appointment, index) =>
							<li key={index}>Date: {appointment.appointmentDate} <br />
								Specialty: {appointment.professional.specialty} <br />
								Professional: {appointment.professional.name}</li>) : ''} </ul>
					</div>
					:
					<div>
						<form>
							<input value="Search patient..." readOnly />
						</form>
						<button>Add new patient</button>
					</div>}
			</div>
		);
	}
}

export default withAuth(Home);
