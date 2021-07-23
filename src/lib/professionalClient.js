import axios from 'axios';

class ProfessionalClient {
	constructor() {
		this.professionalClient = axios.create({
			baseURL: process.env.REACT_APP_API_URI,
			withCredentials: true,
		});
	}
  
	home() {
		return this.professionalClient.get('/professionals/home').then(response => response.data);
	}

	getAppointments() {
		return this.professionalClient.get('/professionals/home').then(response => response.data.appointments);
	}

	addNewPatient({ email, password, name, phoneNr, birthDate, weight, height, conditions }) {
		console.log("enter addnewpatient")
		return this.professionalClient.post('/professionals/add', { email, password, name, phoneNr, birthDate, weight, height, conditions }).then(response => response.data);
	}

}

const professionalClient = new ProfessionalClient();

export default professionalClient;
