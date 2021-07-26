import React, { Component } from 'react';
import moment from 'moment';
import { withAuth } from "../providers/AuthProvider";
import apiClient from '../lib/apiClient';
import { Link } from 'react-router-dom';
import authClient from '../lib/authClient';

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
		const user = await authClient.whoami();
		const { isProfessional } = user;
		let appointments;
		if (isProfessional) {
			appointments = await apiClient.getProfessionalAppointments();
		} else {
			appointments = await apiClient.getPatientAppointments();
		}
		const pastAppointments = appointments.filter((appointment) => moment().isAfter(appointment.appointmentDate));
		const futureAppointments = appointments.filter((appointment) => moment().isBefore(appointment.appointmentDate));
		this.setState({ isProfessional, appointments, pastAppointments, futureAppointments, isLoading: false})
	}
	
	// component professionalAppointment o patientAppointment

	render() {
		const { isProfessional, pastAppointments, futureAppointments, isLoading } = this.state;
		
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
								{appointment.patient ? "Patient:" : "Appointment id:"}
								{appointment.patient ? <Link to={`/${appointment.patient._id}`}>{appointment.patient.name}</Link> : 
								<Link to={`/${appointment._id}`}>{appointment._id}</Link>}
								<br /><br /></li>
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
								{appointment.patient ? "Patient:" : "Appointment id:"}
								{appointment.patient ? <Link to={`/${appointment.patient._id}`}>{appointment.patient.name}</Link> : 
								<Link to={`/${appointment._id}`}>{appointment._id}</Link>}
								<br /><br /></li>
						}) : ''} </ul>
					</div>
					}
			</div>
		);
	}
}

export default withAuth(Appointments);
