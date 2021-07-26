import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import apiClient from '../lib/apiClient';

class ClinicalHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isMyPatient: false,
      patientExists: true,
      id: '',
      name: '',
      height: '',
      weight: '',
      appointments: [],
      conditions: []
    }
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    try {
      const clinicalHistory = await apiClient.getClinicalHistory(id);
      if (clinicalHistory) {
        const { isProfessional, name, height, weight, conditions} = clinicalHistory.user;
        const appointments = clinicalHistory.usersAppointments;
        return this.setState({ isLoading: false, isMyPatient: true, isProfessional, name, height, weight, appointments, conditions });
      }
    } catch (error) {
      if (error.toString().split(" ")[6] === "403") {
        return this.setState({ isLoading: false, isMyPatient: false })
      } else if (error.toString().split(" ")[6] === "422") {
        return this.setState({ isLoading: false, patientExists: false })
      }
    }
  }

  handleClick = async() => {
    const { id } = this.props.match.params;
    try {
      await apiClient.deletePatient(id);
      return alert("Patient has been deleted!")
    } catch (e) {
      console.log(e);
    } finally {
      this.props.history.push('/appointments');
    }
  };

  render() {
    const {  isLoading, isMyPatient, patientExists, isProfessional, name, height, weight, appointments, conditions } = this.state;
    
		if (isLoading) {
			return <div>Loading ... </div>;
    }
    
    if (!patientExists) {
      return <div>Patient does not exist </div>;
    }

    if (!isMyPatient) {
      return <div>Sorry! We can not display this patients personal info, it looks like this is not your patient.</div>
    }
    
    return (
      <div>
        <h1>Clinical history</h1>
        <h2>Name:</h2>
        <p>{name}</p>
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
        <h2>Appointment log:</h2>
        <ul>
          {appointments.map((appointment, index) => {
            const { appointmentDate } = appointment;
            const day = appointmentDate.split("T")[0];
            return <li key={index}>
              {day} | Dr. {appointment.professional.name}<br />
            </li>
          })
          }
        </ul>
        <Link to="/update"><button>Update patient</button></Link>
        {!isProfessional ? <button onClick={this.handleClick}>Delete patient</button> : ''}
      </div>
    )
  
  }

}

export default ClinicalHistory;
