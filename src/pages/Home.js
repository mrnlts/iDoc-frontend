import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../lib/apiClient';
import authClient from '../lib/authClient';

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
		try {
			const user = await authClient.whoami();
			const { name, isProfessional } = user;
			if (!isProfessional) {
				const appointments = await apiClient.getPatientAppointments();
				return this.setState({ name, isProfessional: false, appointments, isLoading: false })
			}
			const appointments = await apiClient.getProfessionalAppointments();
			return this.setState({ name, isProfessional: true, appointments, isLoading: false })
		} catch (e) {
			console.log(e)
		}
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
						<Link to="/addpatient"><button>Add new patient</button></Link>
					</div>}
			</div>
		);
	}
}

export default Home;
