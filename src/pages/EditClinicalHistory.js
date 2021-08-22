import React, { Component } from 'react';
import { faPencilAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import authClient from '../lib/authClient';
import apiClient from '../lib/apiClient';
import Button from '../components/Button';
import FormInput from '../components/FormInput';

class EditClinicalHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      id: '',
      name: '',
      height: '',
      weight: '',
      conditions: [],
      newCondition: '',
    }
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    try {
      const clinicalHistory = await apiClient.getClinicalHistory(id);
      if (clinicalHistory) {
        const { isProfessional, name, height, weight, conditions} = clinicalHistory.user;
        return this.setState({ isLoading: false, isMyPatient: true, isProfessional, name, height, weight, conditions });
      }
    } catch (e) {
      console.log(e)
    }
  }

    handleFormSubmit = async (event) => {
    event.preventDefault();
    const { id } = this.props.match.params;
    const { name, height, weight, conditions } = this.state;
    try {
      await authClient.updateClinicalHistory({ id, name, weight, height, conditions });
    } catch (e) {
      console.log(e)
    } 
  };

  handleChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  addCondition = (event) => {
    event.preventDefault();  
    const { conditions, newCondition } = this.state;
    conditions.push(newCondition);
    return this.setState({ conditions, newCondition: '' });
  }

  deleteCondition = (event) => {
    event.preventDefault();
    const { conditions } = this.state;
    const index = conditions.findIndex((condition) => condition === event.target.parentNode.parentNode.innerText);
    conditions.splice(index, 1);
    return this.setState({ conditions });
  }
  
  render() {
    const {  isLoading, name, height, weight, conditions, newCondition } = this.state;
    const notify = async () => {
      await toast.success('Updated!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }); 
    }

		if (isLoading) {
			return <div>Loading ... </div>;
    }
    
    return (
      <div className="w-full flex flex-col justify-center items-center mt-5">
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
        <span className="text-5xl text-white bg-blue-300 p-5 rounded-full"><FontAwesomeIcon icon={faPencilAlt} /></span>
        <form onSubmit={this.handleFormSubmit} className="w-3/4" encType="multipart/form-data">
          <label>Name</label>
          <FormInput value={name} black changeAction={this.handleChange}>name</FormInput>
          
          <label>Height</label>
          <FormInput value={height} black changeAction={this.handleChange}>height</FormInput>
          
          <label>Weight</label>
          <FormInput value={weight} black changeAction={this.handleChange}>weight</FormInput>
        
          <label>Conditions</label>
          <ul className="bg-white p-2 mb-3 w-full rounded-lg shadow-xl">
            {conditions.length === 0 ? "No conditions registered yet" : conditions.map((condition, index) => {
              return (condition.length >= 1) ? <li key={index}>{condition} <span onClick={this.deleteCondition}> <FontAwesomeIcon className="text-gray-500" value={ index} icon={faTimesCircle} /></span></li> : ''
            })
            }
          </ul>
            
          <div className="flex justify-between h-11">
            <FormInput value={newCondition} semi black placeholder={"Type new condition"} changeAction={this.handleChange}>newCondition</FormInput>
            <Button input black gray small clickAction={this.addCondition}>Add</Button>
          </div>
            
          <div className="w-full text-center mt-7">
            <Button input black clickAction={notify} />
          </div>
        </form>
        
      </div>
    )
  }
}

export default EditClinicalHistory;
