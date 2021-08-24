import React, { Component } from "react";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";

import { withAuth } from "../providers/AuthProvider";
import apiClient from "../lib/apiClient";
import Button from "../components/Button";
import FormInput from "../components/FormInput";

class AddPatient extends Component {
  constructor(props) {
    super(props)
    this.state = {
    email: "",
    validEmail: null,
    password: "",
    validPassword: null,
    name: "",
    validName: null,
    phoneNr: 0,
    birthDate: undefined,
    weight: 0,
    height: 0,
    conditions: [],
  };
  }

  handleFormSubmit = async(event) => {
    event.preventDefault();
    const { email, password, name, phoneNr, weight, height } = this.state;
    let { birthDate, conditions } = this.state;
    birthDate = moment(birthDate).toDate();
    conditions = conditions.split(",");
    try {
      const newUser = await apiClient.addNewPatient({ email, password, name, phoneNr, birthDate, weight, height, conditions });
      await toast.success('Patient added!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      await this.setState({
        email: "",
        password: "",
        name: "",
        phoneNr: 0,
        birthDate: undefined,
        weight: 0,
        height: 0,
        conditions: [],
      });
      this.props.history.push(`/${newUser._id}`);
    } catch (e) {
      console.log(e)
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
    } else if (id === "name") {
      const editvalue = value.replace(/^[a-zA-Z]([-']?[a-zA-Z]+)*( [a-zA-Z]([-']?[a-zA-Z]+)*)+$/);
      if (editvalue === "undefined") {
        return this.setState({ name: value, validName: true });
      }
      return this.setState({ name: value, validName: false });
    } else {
      this.setState({ [id]: value });
    }
  };

  handleDropdown = event => {
    const { value } = event.target;
    this.setState({ specialty: value });
  }

  render() {
    const { email, validEmail, password, validPassword, name, validName, phoneNr, birthDate, weight, height, conditions } = this.state;
    
    return (
      <div className="flex flex-col h-full justify-between items-center pt-8">
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
        <form onSubmit={this.handleFormSubmit} className="w-3/4">
          <label>Email</label>
          <FormInput value={email} valid={validEmail} placeholder={"example@gmail.com"} changeAction={this.handleChange}>email</FormInput>
          
          <label>Password</label>
          <FormInput value={password} valid={validPassword} placeholder={"*****************"} changeAction={this.handleChange}>password</FormInput>
        
          <label>Full name</label>
          <FormInput value={name} valid={validName} placeholder={"John Doe"} changeAction={this.handleChange}>name</FormInput>
         
          <div className="flex justify-between w-full">
            <div className="w-1/2 pr-1">
              <label>Birth date</label>
              <FormInput value={birthDate} changeAction={this.handleChange}>birthDate</FormInput>
            </div>
            <div className="w-1/2 pl-2">
              <label>Phone nr</label>
              <FormInput value={phoneNr} placeholder={"938432565"} changeAction={this.handleChange}>phoneNr</FormInput>
            </div>
          </div>
          
          <div className="flex justify-between w-full">
            <div className="w-1/2 pr-2">
              <label>Height</label>
              <FormInput value={height} placeholder={"167 cm"} changeAction={this.handleChange}>height</FormInput>
            </div>

            <div className="w-1/2 pl-2">
              <label>Weight</label>
              <FormInput value={weight} placeholder={"64 kg"} changeAction={this.handleChange}>weight</FormInput>
            </div>
          </div>

          <label>Conditions</label>
          <FormInput value={conditions} placeholder={"Place commas between conditions"} changeAction={this.handleChange}>conditions</FormInput>

          <div className="w-full text-center">
            <Button black input>Add patient</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default withAuth(AddPatient);
