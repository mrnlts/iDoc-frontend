import React, { Component } from "react";
import { withAuth } from "../providers/AuthProvider";
import apiClient from "../lib/apiClient";
import moment from "moment";

class AddPatient extends Component {
  constructor(props) {
    super(props)
    this.state = {
    email: "",
    password: "",
    name: "",
    phoneNr: "",
    birthDate: "",
    weight: "",
    height: "",
    conditions: "",
  };
  }

  handleFormSubmit = async(event) => {
    event.preventDefault();
    const { email, password, name  } = this.state;
    let { phoneNr, birthDate, weight, height, conditions } = this.state;
    phoneNr = Number(phoneNr);
    birthDate = moment(birthDate).toDate();
    weight = Number(weight);
    height = Number(height);
    conditions = conditions.split(",");
    try {
      await apiClient.addNewPatient({ email, password, name, phoneNr, birthDate, weight, height, conditions });
      return alert("New patient added!")
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

  handleDropdown = event => {
    const { value } = event.target;
    this.setState({ specialty: value });
  }

  render() {
    const { email, password, name, phoneNr, birthDate, weight, height, conditions } = this.state;
 
    return (
      <div>
        <h1> Add new patient</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label>Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={this.handleChange}
          />
          <br />
          <label>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={this.handleChange}
          />
          <br />
          <label>Full name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={this.handleChange}
          />
          <br />
          <label>Phone number:</label>
          <input
            type="number"
            id="phoneNr"
            value={phoneNr}
            onChange={this.handleChange}
          />
          <br />
          <label>Birth date:</label>
          <input
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={this.handleChange}
          />
          <br />
          <label>Height:</label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={this.handleChange}
          />
          <br />
          <label>Weight:</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={this.handleChange}
          />
          <br />
          <label>Conditions:</label>
          <input
            type="text"
            id="conditions"
            value={conditions}
            onChange={this.handleChange}
          />
          <br />
          <input type="submit" value="AddPatient" />
          <br />
        </form>
      </div>
    );
  }
}

export default withAuth(AddPatient);
