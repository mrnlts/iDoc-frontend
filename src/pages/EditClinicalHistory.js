import React, { Component } from 'react';
import authClient from '../lib/authClient';
import apiClient from '../lib/apiClient';
import { faPencilAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      newCondition: ''
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
      return alert("updated!")
    } catch (e) {
      console.log(e)
    } finally {
      this.props.history.push('/home');
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
    const index = conditions.findIndex((condition) => condition === event.target.parentNode.innerHTML.split("<")[0].trim());
    conditions.splice(index, 1);
    return this.setState({ conditions });
  }
  
  render() {
    const {  isLoading, name, height, weight, conditions, newCondition } = this.state;
    
		if (isLoading) {
			return <div>Loading ... </div>;
    }
    
    return (
      <div className="w-full flex flex-col justify-center items-center mt-5">
        <span className="text-5xl text-white bg-blue-300 p-5 rounded-full"><FontAwesomeIcon icon={faPencilAlt} /></span>
        <form onSubmit={this.handleFormSubmit} className="w-3/4">
        <label>Name</label>
        <br />
        <input type="text"className="p-2 mb-3 w-full rounded-lg shadow-xl" id="name" value={name} onChange={this.handleChange}/>
        <br />
        <label>Height</label>
        <br />
        <input type="number"className="p-2 mb-3 w-full rounded-lg shadow-xl" id="height" value={height} onChange={this.handleChange}/>
        <br />
        <label>Weight</label>
        <br />
        <input value={weight} className="p-2 mb-3 w-full rounded-lg shadow-xl" id="weight" onChange={this.handleChange}/>
        <br />
        <label>Conditions</label>
        <ul className="bg-white p-2 mb-3 w-full rounded-lg shadow-xl">
          {conditions.length === 0 ? "No conditions registered yet" : conditions.map((condition, index) => {
            return (condition.length >= 1) ? <li key={index}>{condition}   <span onClick={this.deleteCondition}> <FontAwesomeIcon className="text-gray-500" icon={faTimesCircle} /></span></li> : ''
          })
          }
          </ul>
          <div className="flex justify-between">
          <input type="text"className="p-2 w-2/3 rounded-lg shadow-xl" id="newCondition" placeholder="Type new condition" value={newCondition} onChange={this.handleChange} />
            <input type="submit" className="bg-gray-400 w-1/4 text-sm p-2 rounded-lg shadow-xl" value="Add" onClick={this.addCondition} />
            </div>
          <div className="w-full text-center">
            <input type="submit" className="border border-blue-300 mt-3 bg-blue-300 pt-2 pb-2 rounded-lg w-1/3 shadow-xl" value="Update" />
          </div>
        </form>
        <br />
      </div>
    )
  
  }

}

export default EditClinicalHistory;
