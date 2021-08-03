import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser, faSearch, faStethoscope, faUserPlus, faCalendar } from '@fortawesome/free-solid-svg-icons';

import apiClient from '../lib/apiClient';
import authClient from '../lib/authClient';

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: true,
			isProfessional: '',
			name: '',
			appointments: '',
			patientQuery: '',
			patientsArr: [],
			patientsShown: [],
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
			const patientsArr = await apiClient.getMyPatients();
			return this.setState({ name, isProfessional: true, appointments, isLoading: false, patientsArr })
		} catch (e) {
			console.log(e)
		}
	}

	handleChange = event => {
		const { patientsArr } = this.state;
		const oldPatients = [...patientsArr];
		const { value } = event.target;
		let patientsShown = [];
		oldPatients.map(patient => patient.name.toLowerCase().includes(value.toLowerCase()) ? patientsShown.push(patient) : null,
    );
    patientsShown= value === '' ? [] : patientsShown;
		this.setState({ patientQuery: value, patientsShown });
  };

	render() {
		const { isLoading, name, isProfessional, appointments,  patientQuery, patientsShown } = this.state;
	
		if (isLoading) {
			return <div>loading ... </div>;
		}
		return (
			<div className="flex flex-col w-full h-screen justify-evenly items-center text-center">
				<div>
				<span className="text-5xl text-white bg-blue-300 p-5 rounded-full">{isProfessional ? <FontAwesomeIcon icon={faStethoscope} /> : <FontAwesomeIcon icon={faHouseUser} />}</span>
					<p className="text-xl mt-7 font-bold">Welcome back, {isProfessional ? "Dr. "+name.split(" ")[1] : name.split(" ")[0] }!</p>
					</div>
				{!isProfessional ?
					<div className="mt-7 border-2 border-blue-300 border-solid rounded-md p-5 w-3/4 bg-white bg-opacity-60 shadow-xl">
						<p className="mb-7">{appointments.length === 0 ? "You have no scheduled appointments at the moment" : `Upcoming appointments:`}</p>
						<ul> {appointments.length >= 1 ? appointments.slice(0, 2).map((appointment, index) => {
							const { appointmentDate } = appointment;
							const day = appointmentDate.split("T")[0];
							const hour = appointmentDate.split("T")[1].split(":");
							return <li key={index}>
								<FontAwesomeIcon icon={faCalendar} className="text-gray-500" /> {day} | {hour[0]}:{hour[1]}<br />
								<p className="text-sm"> Dr. {appointment.professional.name.split(" ")[1]} <span> | </span> 
								{appointment.professional.specialty} <br /><br /></p></li>
						}) : ''}
						</ul>
					</div>
					:
					<div className="mt-7 border border-blue-300 ml-0">
						<form>
							<FontAwesomeIcon icon={faSearch} className="relative left-7 text-white"/>
							<input placeholder="Search patient" className="rounded-md w-60 shadow-xl bg-blue-300 p-2 pl-12 placeholder-white text-white" value={ patientQuery } onChange={this.handleChange} />
						</form>
						<div className="ml-3">
							{patientsShown.length > 0 ? <div className="bg-white bg-opacity-50 p-2 pl-12 rounded-md w-60 flex flex-col m-auto items-baseline"> {patientsShown.map((patient, index) => <Link to={`/${patient.id}`} key={index}>{patient.name}</Link>)}</div> : ''}
						</div>
							<Link to="/addpatient" ><FontAwesomeIcon icon={faUserPlus} className="relative left-8 text-white" /><button className="mt-7 rounded-md w-60 shadow-xl bg-blue-300 p-2 text-white">Add new patient</button></Link>
					</div>}
			</div>
		);
	}
}

export default Home;
