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
		return this.professionalClient.post('/professionals/add', { email, password, name, phoneNr, birthDate, weight, height, conditions }).then(response => response.data);
	}

	getClinicalHistory(id) {
		return this.professionalClient.get(`/professionals/patients/${id}`).then(clinicalHistory => clinicalHistory.data);
	}

	deletePatient(id){
		return this.professionalClient.delete(`/professionals/patients/${id}`).then(response => console.log(response));
	}

}

const professionalClient = new ProfessionalClient();

export default professionalClient;
