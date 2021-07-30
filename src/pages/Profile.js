import React, { Component } from 'react';
import authClient from '../lib/authClient';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPatient: undefined, 
      height: '',
      weight: '',
      email: '',
      phoneNr: '',
      appointments: [],
      conditions: []
    }
  }

  async componentDidMount() {
    const user = await authClient.whoami();
    const { isPatient, height, weight, email, phoneNr, appointments, conditions } = user;
    if (isPatient) {
      this.setState({
        isPatient, height, weight, email, phoneNr, appointments, conditions
      });
    } else {
      this.props.history.push('/home');
    }
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { email, phoneNr } = this.state;
    try {
      await authClient.updateMe({ email, phoneNr });
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
    const { height, weight, email, phoneNr, conditions } = this.state;
    
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
        <h1>Your clinical history</h1>
        <h2>Height:</h2>
        <p>{height}</p>
        <h2>Weight:</h2>
        <p>{weight}</p>
        <h2>Conditions:</h2>
        <ul>
          {conditions.length === 0 ? "No conditions registered yet" : conditions.map((condition, index) => {
            return <li key={index}>
              {condition}<br />
            </li>
          })
          }
        </ul>        
      </div>
    );
  }
}

export default Profile;
