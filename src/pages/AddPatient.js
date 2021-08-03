import React, { Component } from "react";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";

import { withAuth } from "../providers/AuthProvider";
import apiClient from "../lib/apiClient";

class AddPatient extends Component {
  constructor(props) {
    super(props)
    this.state = {
    email: "",
    password: "",
    name: "",
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
      await apiClient.addNewPatient({ email, password, name, phoneNr, birthDate, weight, height, conditions });
      await toast.success('Patient added!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });  
      this.setState({
          email: "",
          password: "",
          name: "",
          phoneNr: 0,
          birthDate: undefined,
          weight: 0,
          height: 0,
          conditions: [],
        });
    } catch (e) {
      console.log(e)
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
          <br />
          <input
            type="text"
            id="email"
            value={email}
            placeholder="example@gmail.com"
            className="p-2 mb-3 w-full rounded-lg shadow-xl"
            onChange={this.handleChange}
          />
          <br />
          <label>Password</label>
          <br />
          <input
            type="password"
            id="password"
            value={password}
            placeholder="***************"
            className="p-2 mb-3 w-full rounded-lg shadow-xl"
            onChange={this.handleChange}
          />
          <br />
          <label>Full name</label>
          <br />
          <input
            type="text"
            id="name"
            value={name}
            placeholder="John Doe"
            className="p-2 mb-3 w-full rounded-lg shadow-xl"
            onChange={this.handleChange}
          />
          <br />
         
          <div className="flex justify-between w-full">
            <div className="w-1/2 pr-1">
              <label>Birth date</label>
              <br />
              <input
                type="date"
                id="birthDate"
                value={birthDate}
                className="pt-2 pb-2 pl-1 mb-3 w-full rounded-lg shadow-xl text-sm  text-gray-400"
                onChange={this.handleChange}
                />
            </div>
            <div className="w-1/2 pl-2">
              <label>Phone nr</label>
              <br />
              <input
                type="number"
                id="phoneNr"
                value={phoneNr}
                placeholder="938432565"
                className="p-2 mb-3 w-full rounded-lg shadow-xl"
                onChange={this.handleChange}
              />
              </div>
          </div>
          <div className="flex justify-between w-full">
            <div className="w-1/2 pr-2">
              <label>Height</label>
              <br />
              <input
                type="number"
                id="height"
                value={height}
                placeholder="167 cm"
                className="p-2 mb-3 w-full rounded-lg shadow-xl"
                onChange={this.handleChange}
              />
            </div>
            <div className="w-1/2 pl-2">
              <label>Weight</label>
              <br />
              <input
                type="number"
                id="weight"
                value={weight}
                placeholder="64 kg"
                className="p-2 mb-3 w-full rounded-lg shadow-xl"
                onChange={this.handleChange}
                />
              </div>
          </div>
          <label>Conditions</label>
          <br />
          <input
            type="text"
            id="conditions"
            value={conditions}
            placeholder="Place commas between conditions"
            className="p-2 mb-3 w-full rounded-lg shadow-xl"
            required
            onChange={this.handleChange}
          />
          <br />
          <div className="w-full text-center">
          <input
            type="submit"
            value="Add patient"
            className="border border-blue-300 mt-3 bg-blue-300 pt-2 pb-2 rounded-lg w-52 shadow-xl"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default withAuth(AddPatient);
