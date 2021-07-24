import React, { Component } from 'react';

import professionalClient from '../lib/professionalClient';

class ClinicalHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isMyPatient: false,
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
      const clinicalHistory = await professionalClient.getClinicalHistory(id);
      if (clinicalHistory) {
        const { name, height, weight, conditions } = clinicalHistory.user;
        const appointments = clinicalHistory.usersAppointments;
        return this.setState({ isLoading: false, isMyPatient: true, name, height, weight, appointments, conditions });
      }
    } catch (error) {
      if (error) {
        return this.setState({ isLoading: false, isMyPatient: false })
      }
      // this.state.props.history.push('/')
    }
  }

  render() {
    const { isMyPatient, name, height, weight, appointments, conditions, isLoading } = this.state;
    
		if (isLoading) {
			return <div>loading ... </div>;
		}

    return (
      <div>
        {isMyPatient ? 
        (<div>
          <h1>Clinical history</h1>
          <h2>Name:</h2>
          <p>{ name}</p>
          <h2>Height:</h2>
          <p>{ height}</p>
          <h2>Weight:</h2>
          <p>{ weight}</p>
          <h2>Conditions:</h2>
          <ul>
          {conditions.length === 0 ? "No conditions registered yet" : conditions.map((condition, index) => {
            return <li key={index}>
              { condition}<br />
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
              {day} | Dr. { appointment.professional.name}<br />
            </li>
          })
          }
          </ul>
          </div>)
          :
          "Sorry! We can't display this patient's personal info, it looks like this is not your patient."}
      </div>
    );
  }
}

export default ClinicalHistory;
