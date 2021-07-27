import React, { Component } from 'react';
import authClient from '../lib/authClient';
import apiClient from '../lib/apiClient';

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
      <div>
        <h1>Edit clinical history</h1>
        <form onSubmit={this.handleFormSubmit}>
        <label>Name:</label>
        <br />
        <input type="text" id="name" value={name} onChange={this.handleChange}/>
        <br />
        <label>Height:</label>
        <br />
        <input type="number" id="height" value={height} onChange={this.handleChange}/>
        <br />
        <label>Weight:</label>
        <br />
        <input value={weight} id="weight" onChange={this.handleChange}/>
        <br />
        <label>Conditions:</label>
        <ul>
          {conditions.length === 0 ? "No conditions registered yet" : conditions.map((condition, index) => {
            return (condition.length >= 1) ? <li key={index}>{condition}   <span onClick={this.deleteCondition}>|    X</span></li> : ''
          })
          }
          </ul>
          <input type="text" id="newCondition" value={newCondition} onChange={this.handleChange} />
          <input type="submit" value="Add condition" onClick={this.addCondition} />
          <br />
          <input type="submit" value="Update"/>
        </form>
        <br />
      </div>
    )
  
  }

}

export default EditClinicalHistory;
