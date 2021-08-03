import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

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
			chosenDoc: undefined,
			docs: ''
		}
	}
	
	async componentDidMount() {
		const user = await authClient.whoami();
		const { isProfessional } = user;
		let appointments;
		if (isProfessional) {
			appointments = await apiClient.getProfessionalAppointments();
			const pastAppointments = appointments.filter((appointment) => moment().isAfter(appointment.appointmentDate));
		const futureAppointments = appointments.filter((appointment) => moment().isBefore(appointment.appointmentDate));
		this.setState({ user, isProfessional, appointments, pastAppointments, futureAppointments, isLoading: false })
		} else {
			const docs = await apiClient.getCurrentDocs();
			appointments = await apiClient.getPatientAppointments();
		const pastAppointments = appointments.filter((appointment) => moment().isAfter(appointment.appointmentDate));
		const futureAppointments = appointments.filter((appointment) => moment().isBefore(appointment.appointmentDate));
		this.setState({ user, isProfessional, appointments, pastAppointments, futureAppointments, isLoading: false, docs })
		}
	}
	
	requestAppointment = (event) => {
		event.preventDefault();
		const { user, docs, chosenDoc } = this.state;
		const { _id } = user;
		const professional = chosenDoc === undefined ? docs[0] : chosenDoc;
		const appointmentDate = moment(event.target[1].value).toDate();
		apiClient.requestAppointment(appointmentDate, professional, _id);
	}

  handleChange = event => {
		const { id, value } = event.target;
    this.setState({ [id]: value });
  };

	render() {
		const { docs, isProfessional, pastAppointments, futureAppointments, isLoading, reqDate } = this.state;
		
		if (isLoading) {
			return <div>loading ... </div>;
		}
		return (
			<div className="flex flex-col h-full justify-between items-center pt-8">
				<span className="text-5xl text-white bg-blue-300 p-5 rounded-full"><FontAwesomeIcon icon={faCalendar} /></span>
				<p className="text-xl font-bold mt-5">My future appointments</p>
				{!isProfessional ?
					<div className="mt-7 border-2 border-blue-300 border-solid rounded-md p-5 w-3/4 bg-white bg-opacity-60 shadow-xl">
						<p>{futureAppointments.length === 0 ? "You have no scheduled appointments" : ""}</p>
						<ul> {futureAppointments.length >= 1 ? futureAppointments.map((appointment, index) => {
							const { appointmentDate } = appointment;
							const day = appointmentDate.split("T")[0];
							const hour = appointmentDate.split("T")[1].split(":");
							return <li key={index} className="mb-3">
								<FontAwesomeIcon icon={faCalendar}  className="text-gray-500"/>  <span className="font-bold">{day} | {hour[0]}:{hour[1]}</span><br />
								<p className="text-sm"> Dr. {appointment.professional.name.split(" ")[1]} <span> | </span> 
								{appointment.professional.specialty}</p></li>
						
						}) : ''} </ul>
					</div>
					:
					<div className="mt-7 border-2 border-blue-300 border-solid rounded-md p-5 w-3/4 bg-white bg-opacity-60 shadow-xl">
						<p>{futureAppointments.length === 0 ? "You have no scheduled appointments" : ""}</p>
						<ul> {futureAppointments.length >= 1 ? futureAppointments.map((appointment, index) => {
							const { appointmentDate } = appointment;
							const day = appointmentDate.split("T")[0];
							const hour = appointmentDate.split("T")[1].split(":");
							return <li key={index} className="mb-3">
								<FontAwesomeIcon icon={faCalendar}  className="text-gray-500"/>  <span className="font-bold">{day} | {hour[0]}:{hour[1]}</span><br />
								{appointment.patient ? "Patient: " : "Appointment id: "} 
								{appointment.patient ? <Link to={`/${appointment.patient._id}`} className="cursor-pointer">{appointment.patient.name} <FontAwesomeIcon icon={faPlusCircle} className="text-gray-500"/></Link> : 
								<Link to={`/${appointment._id}`}>{appointment._id}</Link>}
								</li>
						}) : ''} </ul>
					</div>
				}

				<p className="text-xl font-bold mt-5">My past appointments</p>
				{!isProfessional ?
					(
						<div className="flex flex-col items-center w-full">
							<div className="mt-7 border-2 border-blue-300 border-solid rounded-md p-5 w-3/4 bg-white bg-opacity-60 shadow-xl">
							<p>{pastAppointments.length === 0 ? "You have no past appointments" : ""}</p>
							<ul> {pastAppointments.length >= 1 ? pastAppointments.map((appointment, index) => {
								const { appointmentDate } = appointment;
								const day = appointmentDate.split("T")[0];
								const hour = appointmentDate.split("T")[1].split(":");
								return <li key={index} className="mb-3">
									<FontAwesomeIcon icon={faCalendar}  className="text-gray-500"/>  <span className="font-bold">{day} | {hour[0]}:{hour[1]}</span><br />
									<p className="text-sm"> Dr. {appointment.professional.name.split(" ")[1]} <span> | </span> 
								{appointment.professional.specialty}</p></li>
							}) : ''} </ul>
								</div>

							<p className="text-xl font-bold mt-7 mb-7">Need an appointment?</p>
							<form onSubmit={this.requestAppointment} className="w-3/4">
								<label>Choose a professional:</label>
								<br />
								<select className="p-2 mb-3 w-full bg-white rounded-lg shadow-xl h-10">
									{docs.map((doc, index) => <option key={index} id="chosenDoc" value={doc.name} onChange={this.handleChange}>Dr. {doc.name.split(" ")[1]} ({ doc.specialty})</option>)}
								</select>
								<br />
								<label>Choose a date:</label>
								<br />
								<input
									type="date"
									id="reqDate"
									value={reqDate}
									className="p-2 mb-5 w-full bg-white rounded-lg shadow-xl h-10"
									onChange={this.handleChange}
								/>
								<br />
								<div className="w-full text-center">
									<input type="submit" className="border border-blue-300 bg-blue-300 pt-2 pb-2 mb-2 rounded-lg w-52 shadow-xl" value="Request appointment" />
									</div>
							</form>		
						</div>
					)
					:
					(
						<div className="mt-7 border-2 border-blue-300 border-solid rounded-md p-5 w-3/4 bg-white bg-opacity-60 shadow-xl">
							<h2>{pastAppointments.length === 0 ? "You have no scheduled appointments" : ""}</h2>
							<ul> {pastAppointments.length >= 1 ? pastAppointments.map((appointment, index) => {
								const { appointmentDate } = appointment;
								const day = appointmentDate.split("T")[0];
								const hour = appointmentDate.split("T")[1].split(":");
								
								return <li key={index} className="mb-3">
									<FontAwesomeIcon icon={faCalendar}  className="text-gray-500"/>  <span className="font-bold">{day} | {hour[0]}:{hour[1]}</span><br />
									{appointment.patient ? "Patient: " : "Appointment id: "} 
									{appointment.patient ? <Link to={`/${appointment.patient._id}`} className="cursor-pointer">{appointment.patient.name} <FontAwesomeIcon icon={faPlusCircle} className="text-gray-500"/></Link> : 
									<Link to={`/${appointment._id}`}>{appointment._id}</Link>}
									</li>
							}) : ''} </ul>
					</div>
					)
					}
			</div>
		);
	}
}

export default withAuth(Appointments);
