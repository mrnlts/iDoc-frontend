import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { withAuth } from "../providers/AuthProvider";
import apiClient from '../lib/apiClient';
import authClient from '../lib/authClient';

class Appointments extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: '',
			isProfessional: '',
			appointments: '',
			pastAppointments: '',
			futureAppointments: '',
			reqDate: '',
			isLoading: true,
			chosenDoc: '',
			docs: ''
		}
	}
	
	async componentDidMount() {
		const user = await authClient.whoami();
		const { isProfessional } = user;
		const docs = await apiClient.getCurrentDocs();
		let appointments;
		if (isProfessional) {
			appointments = await apiClient.getProfessionalAppointments();
		} else {
			appointments = await apiClient.getPatientAppointments();
		}
		const pastAppointments = appointments.filter((appointment) => moment().isAfter(appointment.appointmentDate));
		const futureAppointments = appointments.filter((appointment) => moment().isBefore(appointment.appointmentDate));
		this.setState({ user, isProfessional, appointments, pastAppointments, futureAppointments, isLoading: false, docs })
	}
	
	// component professionalAppointment o patientAppointment
	requestAppointment = (event) => {
		event.preventDefault();
		console.log(event.target);
		console.log("user", this.state.user)
		// apiClient.requestAppointment({ chosenDoc, patient });
	}

	handleSubmit = (event) => {
		event.preventDefault();
		console.log(event.target)
	}

  handleChange = event => {
		const { id, value } = event.target;
		console.log(id, value)
    // this.setState({ [id]: value });

  };

	render() {
		const { docs, isProfessional, pastAppointments, futureAppointments, isLoading, reqDate } = this.state;
		
		if (isLoading) {
			return <div>loading ... </div>;
		}
		return (
			<div>
				<h2>My future appointments</h2>
				{!isProfessional ?
					<div>
						<p>{futureAppointments.length === 0 ? "You have no scheduled appointments" : ""}</p>
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
						<p>{futureAppointments.length === 0 ? "You have no scheduled appointments" : ""}</p>
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

				<h2>My past appointments</h2>
				{!isProfessional ?
					(
						<div>
							<p>{pastAppointments.length === 0 ? "You have no past appointments" : ""}</p>
							<ul> {pastAppointments.length >= 1 ? pastAppointments.map((appointment, index) => {
								const { appointmentDate } = appointment;
								const day = appointmentDate.split("T")[0];
								const hour = appointmentDate.split("T")[1].split(":");
								return <li key={index}>
									{day} | {hour[0]}:{hour[1]}<br />
									Specialty: {appointment.professional.specialty} <br />
									Professional: {appointment.professional.name}<br /><br /></li>
							}) : ''} </ul>
							<h2>Request new appointment</h2>
							<form onSubmit={this.handleSubmit}>
								<label>Choose your doc:</label>
								<br />
								<select>
									{docs.map((doc, index) => <option key={index} id="doc" value={doc.name} onChange={ this.handleChange}>{doc.name}</option>)}
								</select>
								<br />
								<label>Appointment date:</label>
								<br />
								<input
									type="date"
									id="reqDate"
									value={reqDate}
									onChange={this.handleChange}
								/>
								<br />
								<input type="submit" value="Request new appointment" /> 
							</form>		
						</div>
					)
					:
					(
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
					)
					}
			</div>
		);
	}
}

export default withAuth(Appointments);
