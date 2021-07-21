import React, { Component } from 'react';
// import patientClient from '../lib/patientClient';
import authClient from '../lib/authClient';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      phoneNr: '',
      appointments: [],
      conditions: []
    }
  }

  async componentDidMount() {
    const currentUser = await authClient.getMe();
    const { email, phoneNr, appointments, conditions } = currentUser;
    this.setState({ email, phoneNr, appointments, conditions });
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await authClient.updateMe({ email: this.state.email, phoneNr: this.state.phoneNr });
      return alert("updated!")
    } catch (e) {
      console.log(e)
    } finally {
      this.props.history.push('/home');
    }
  };

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  render() {
    const { email, phoneNr } = this.state;
    
    return (
      <div>
        <h1>Contact info</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label>Email: </label>
          <br />
          <input id="email" value={email} onChange={this.handleChange} />
          <br />
          {phoneNr ? <label>Phone Nr: <br /></label> : ''}
          {phoneNr ? <input id="phoneNr" value={phoneNr} onChange={this.handleChange} /> : ''}
          <input type="submit" value="Update" style={{ "display": "block" }} />
        </form>
      </div>
    );
  }
}

export default Profile;