import axios from 'axios';

class PatientClient {
	constructor() {
		this.patientClient = axios.create({
			baseURL: process.env.REACT_APP_API_URI,
			withCredentials: true,
		});
	}
  
	getAppointments() {
		return this.patientClient.get('/patients/appointments').then(response => response.data);
	}

}

const patientClient = new PatientClient();

export default patientClient;
