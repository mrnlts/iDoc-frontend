import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../components/Button';

import apiClient from '../lib/apiClient';
import ErrorPage from './ErrorPage';

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
      conditions: [],
    }
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    try {
      const clinicalHistory = await apiClient.getClinicalHistory(id);
      if (clinicalHistory) {
        const { name, height, weight, conditions} = clinicalHistory.user;
        const appointments = clinicalHistory.usersAppointments;
        return this.setState({ isLoading: false, isMyPatient: true, name, height, weight, appointments, conditions });
      }
    } catch (error) {
      if (error.toString().split(" ")[6] === "403") {
        return this.setState({ isLoading: false, isMyPatient: false })
      } else {
        return this.setState({ isLoading: false, patientExists: false })
      }
    }
  }

  handleClick = async() => {
    const { id } = this.props.match.params;
    try {
      await apiClient.deletePatient(id);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const {  isLoading, isMyPatient, patientExists, name, height, weight, appointments, conditions } = this.state;
    const notify = async () => {
      await toast.success('Deleted!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      await this.handleClick();
      return this.setState({patientExists: false})
    };

		if (isLoading) {
			return <div>Loading ... </div>;
    }
    
    if (!patientExists) {
      return <ErrorPage />;
    }

    if (!isMyPatient) {
      return <div>Sorry! We can not display this patients personal info, it looks like this is not your patient.</div>
    }
    
    return (
      <div className="flex flex-col h-full justify-between items-center pt-8 w-full">
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
        <p className="text-xl font-bold mt-5">Clinical history</p>
        <div className="mt-7 mb-7 border-2 border-blue-300 border-solid rounded-md p-5 w-3/4 bg-white bg-opacity-60 shadow-xl">
          <p className="font-bold">Name</p>
          <p>{name}</p>
          <div className="w-3/4 flex justify-between">
            <div>
              <p className="font-bold pt-5">Height</p>
              <p>{height}</p>
            </div>
            <div>
              <p className="font-bold pt-5">Weight</p>
              <p>{weight}</p>
            </div>
          </div>
          <p className="font-bold pt-5">Conditions</p>
          <ul>
            {conditions.length === 0 ? "No conditions registered yet" : conditions.map((condition, index) => {
              return <li key={index}>
                {condition}<br />
              </li>
            })
            }
          </ul>
          <p className="font-bold pt-5">Appointment log</p>
          <ul>
            {appointments.map((appointment, index) => {
              const { appointmentDate } = appointment;
              if (appointmentDate) {
                const day = appointmentDate.split("T")[0];
                return <li key={index} className="text-sm">
                  <span className="font-bold"> {day} </span>
                  Dr. {appointment.professional.name.split(" ")[1]} (
                  {appointment.professional.specialty})</li>
              } else {
                return null
              }
            })
            }
            </ul>
        </div>
        <div className="flex w-3/4">
          <div className="w-full text-center"><Link to={`/${this.props.match.params.id}/edit`}><Button black small>Update</Button></Link></div>
          <div className="w-full text-center"><Button black small clickAction={notify}>Delete</Button></div>
        </div>
      </div>
    )
  
  }

}

export default ClinicalHistory;
