import axios from 'axios';

class ApiClient {
	constructor() {
		this.apiClient = axios.create({
			baseURL: process.env.REACT_APP_API_URI,
			withCredentials: true,
		});
	}

	profile() {
		return this.apiClient.get('/patients/profile').then(response => response.data);
	}

	home() {
		return this.apiClient.get('/professionals/home').then(response => response.data);
	}

	signup(user) {
		const { email, password, name, specialty } = user;
		return this.apiClient.post('/signup', { email, password, name, specialty }).then(({ data }) => data);
	}

	updateContactInfo({ email, phoneNr }) {
		return this.apiClient.put('/patients/profile', { email, phoneNr }).then(({ data }) => data);
	}

	login(user) {
		const { email, password } = user;
		return this.apiClient.post('/login', { email, password }).then(({ data }) => data);
	}

	logout() {
		return this.apiClient.post('/logout', {}).then(response => response.data);
	}
}

const apiClient = new ApiClient();

export default apiClient;
