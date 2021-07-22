import React, { Component } from 'react';
import moment from 'moment';
import { withAuth } from "../providers/AuthProvider";
import patientClient from '../lib/patientClient';
import professionalClient from '../lib/professionalClient';

class Appointments extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isProfessional: '',
			appointments: '',
			pastAppointments: '',
			futureAppointments: '',
			isLoading: true,
		}
	}
	
	async componentDidMount() {
		const { isProfessional } = this.props.rest.user;
		let appointments;
		if (isProfessional) {
			appointments = await professionalClient.getAppointments();
		} else {
			appointments = await patientClient.getAppointments();
		}
		const pastAppointments = appointments.filter((appointment) => moment().isAfter(appointment.appointmentDate));
		const futureAppointments = appointments.filter((appointment) => moment().isBefore(appointment.appointmentDate));
		this.setState({ isProfessional, appointments, pastAppointments, futureAppointments, isLoading: false})
	}

	render() {
		const { isProfessional, appointments, pastAppointments, futureAppointments, isLoading } = this.state;
		console.log(`You have ${appointments.length} appointments`)
		if (isLoading) {
			return <div>loading ... </div>;
		}
		return (
			<div>
				<h1>My future appointments</h1>
				{!isProfessional ?
					<div>
						<h2>{futureAppointments.length === 0 ? "You have no scheduled appointments" : ""}</h2>
						<ul> {futureAppointments.length >= 1 ? futureAppointments.map((appointment, index) => {
							const { appointmentDate } = appointment;
							const day = appointmentDate.split("T")[0];
							const hour = appointmentDate.split("T")[1].split(":");
							return <li key={index}>
								{day} | {hour[0]}:{hour[1]}<br />
								Specialty: {appointment.professional.specialty} <br />
								Professional: {appointment.professional.name}<br /><br /></li>
						
						}) : ''} </ul>
					</div>
					:
					<div>
						<h2>{futureAppointments.length === 0 ? "You have no scheduled appointments" : ""}</h2>
						<ul> {futureAppointments.length >= 1 ? futureAppointments.map((appointment, index) => {
							const { appointmentDate } = appointment;
							const day = appointmentDate.split("T")[0];
							const hour = appointmentDate.split("T")[1].split(":");
							return <li key={index}>
								{day} | {hour[0]}:{hour[1]}<br />
								Patient: {appointment.patient.name}<br /><br /></li>
						}) : ''} </ul>
					</div>
				}

				<h1>My past appointments</h1>
				{!isProfessional ?
					<div>
						<h2>{pastAppointments.length === 0 ? "You have no past appointments" : ""}</h2>
						<ul> {pastAppointments.length >= 1 ? pastAppointments.map((appointment, index) => {
							const { appointmentDate } = appointment;
							const day = appointmentDate.split("T")[0];
							const hour = appointmentDate.split("T")[1].split(":");
							return <li key={index}>
								{day} | {hour[0]}:{hour[1]}<br />
								Specialty: {appointment.professional.specialty} <br />
								Professional: {appointment.professional.name}<br /><br /></li>
						}) : ''} </ul>
					</div>
					:
					<div>
						<h2>{pastAppointments.length === 0 ? "You have no scheduled appointments" : ""}</h2>
						<ul> {pastAppointments.length >= 1 ? pastAppointments.map((appointment, index) => {
							const { appointmentDate } = appointment;
							const day = appointmentDate.split("T")[0];
							const hour = appointmentDate.split("T")[1].split(":");
							return <li key={index}>
								{day} | {hour[0]}:{hour[1]}<br />
								{appointment.patient ? `Patient: ${appointment.patient.name}` : `Appointment id: ${appointment._id}`}<br /><br /></li>
						}) : ''} </ul>
					</div>
					}
			</div>
		);
	}
}

export default withAuth(Appointments);
