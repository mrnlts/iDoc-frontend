import React, { Component } from "react";
import { withAuth } from "../providers/AuthProvider";
import specialtiesArr from '../data';

import Button from "../components/Button";
import FormInput from "../components/FormInput";
class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
    email: "",
    validEmail: null,
    password: "",
    validPassword: null,
    name: "",
    validName: null,
    specialty: ""
  };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { email, password, name, specialty } = this.state;
    if (specialty !== "") {
      return this.props.signup({ email, password, name, specialty });
    } else {
      return this.props.signup({email, password, name, specialty: "Anesthesiologist"})
    }
  };

  handleChange = event => {
    const { id, value } = event.target;
    if (id === "email") {
      const editvalue = value.replace(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);
      if (editvalue === "undefined") {
        return this.setState({ email: value, validEmail: true });
      }
      return this.setState({ email: value, validEmail: false });
    } else if (id === "password") {
      const editvalue = value.replace(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/);
      if (editvalue === "undefined") {
        return this.setState({ password: value, validPassword: true });
      }
      return this.setState({ password: value, validPassword: false });
    } else {
      const editvalue = value.replace(/^[a-zA-Z]([-']?[a-zA-Z]+)*( [a-zA-Z]([-']?[a-zA-Z]+)*)+$/);
      if (editvalue === "undefined") {
        return this.setState({ name: value, validName: true });
      }
      return this.setState({ name: value, validName: false });
    }
  };

  handleDropdown = event => {
    const { value } = event.target;
    this.setState({ specialty: value });
  }

  render() {
    const { email, validEmail, password, validPassword, name, validName, specialty } = this.state;
    
    return (
      <div className="flex flex-col h-screen justify-evenly items-center">
        <form onSubmit={this.handleFormSubmit}>
          <label>Email</label>
          <FormInput value={email} placeholder={"example@gmail.com"} valid={validEmail} changeAction={this.handleChange}>email</FormInput>
          
          <label>Password</label>
          <FormInput value={password} placeholder={"***********"} valid={validPassword} changeAction={this.handleChange}>password</FormInput>
          
          <label>Full name</label>
          <FormInput value={name} placeholder={"John Doe"} valid={validName} changeAction={this.handleChange}>name</FormInput>
          
          <label>Specialty</label>
          <select
            size="2"
            value={specialty}
            onChange={this.handleDropdown}
            className="p-2 pt-4 mb-10 w-full bg-white text-gray-400 rounded-lg shadow-xl h-20"
          >
            {
              specialtiesArr.map(
                (elem, index) => {
                  return elem === specialty ? <option key={index} id="specialty" value={elem} defaultValue >{elem}</option> : <option key={index} name="specialty" value={elem} >{elem}</option>
                }
                  )
            }
          </select>
          
          <div className="w-full text-center">
          <Button input>Signup</Button>
            </div>
        </form>
      </div>
    );
  }
}

export default withAuth(Signup);
