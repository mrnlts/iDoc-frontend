import React from 'react';
import { withAuth } from "../providers/AuthProvider";


const Home = (props) => {
	const { name, isProfessional, appointments } = props.rest.user;
	return (
		<div>
			<h1>Welcome, {isProfessional ? 'Dr. ' : ''}{name}</h1>
			{!isProfessional ?
				<div>
				<h2>{appointments.length <= 1 ? "You have no scheduled appointments at the moment" : "Here are your upcoming appointments:"}</h2>
				<ul> {appointments.length > 1 ? appointments.slice(0, 2).map((appointment, index) => <li key={index}>Date: {appointment.appointmentDate} <br /> Specialty: {appointment.professional.specialty} <br /> Professional: {appointment.professional.name}</li>) : ''} </ul> 
				</div>
				: 
				<div>
					<form>
						<input value="Search patient..."/>
						</form>
					<button>Add new patient</button>
					</div>}
		</div>
	);
}

export default withAuth(Home);
