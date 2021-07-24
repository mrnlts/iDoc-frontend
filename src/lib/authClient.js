import axios from 'axios';

class AuthClient {
	constructor() {
		this.authClient = axios.create({
			baseURL: process.env.REACT_APP_API_URI,
			withCredentials: true,
		});
	}	
	
	// no guardar el usuario en el estado

	async profile() {
		try {
			const user = await this.authClient.get('/patients/whoami');
			return user.data
		} catch(e) {}
	}

	whoami() {
		return this.authClient.get('/whoami').then(response => response.data);
	}
	
	getMe() {
		return this.authClient.get('/patients/').then(response => response.data);
	}

	home() {
		return this.authClient.get('/professionals/home').then(response => response.data);
	}

	signup(user) {
		const { email, password, name, specialty } = user;
		return this.authClient.post('/signup', { email, password, name, specialty }).then(({ data }) => data);
	}

	updateMe({ email, phoneNr }) {
		return this.authClient.put('/patients/profile', { email, phoneNr }).then(({ data }) => data);
	}

	login(user) {
		const { email, password } = user;
		return this.authClient.post('/login', { email, password }).then(({ data }) => data);
	}

	logout() {
		return this.authClient.post('/logout', {}).then(response => response.data);
	}
}

const authClient = new AuthClient();

export default authClient;
