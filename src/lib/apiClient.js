import axios from 'axios';

class ApiClient {
	constructor() {
		this.apiClient = axios.create({
			baseURL: process.env.REACT_APP_API_URI,
			withCredentials: true,
		});
	}

	addNewPatient({ email, password, name, phoneNr, birthDate, weight, height, conditions }) {
		return this.apiClient.post('/professionals/add', { email, password, name, phoneNr, birthDate, weight, height, conditions }).then(response => response.data);
	}

	deletePatient(id){
		return this.apiClient.delete(`/professionals/patients/${id}`).then(response => console.log(response));
  }
     
	getPatientAppointments() {
		return this.apiClient.get('/patients/appointments').then(response => response.data);
	}

	getProfessionalAppointments() {
		return this.apiClient.get('/professionals/home').then(response => response.data.appointments);
	}

	getClinicalHistory(id) {
		return this.apiClient.get(`/professionals/patients/${id}`).then(clinicalHistory => clinicalHistory.data);
	}
  
}

const apiClient = new ApiClient();

export default apiClient;