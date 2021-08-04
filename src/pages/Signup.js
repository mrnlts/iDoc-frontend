import React, { Component } from "react";
import { withAuth } from "../providers/AuthProvider";
import specialtiesArr from '../data';
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
          <br />
          <input
            type="text"
            id="email"
            value={email}
            required
            placeholder="example@gmail.com"
            className={`p-2 mb-3 w-full rounded-lg border shadow-xl ${validEmail === true ? "text-blue-500 border-blue-500" : validEmail === false ? "text-red-500 border-red-500" : '' }`}
            onChange={this.handleChange}
          />
          <br />
          <label>Password</label>
          <br />
          <input
            type="password"
            id="password"
            value={password}
            required
            placeholder="********"
            className={`p-2 mb-3 w-full rounded-lg border shadow-xl ${validPassword === true ? "text-blue-500 border-blue-500" : validPassword === false ? "text-red-500 border-red-500" : '' }`}
            onChange={this.handleChange}
          />
          {validPassword === false ? <div className=" w-full text-xs">8 characters long, 1 number and 1 uppercase letter</div> : ''}
          <br />
          <label>Full name</label>
          <br />
          <input
            type="text"
            id="name"
            value={name}
            required
            placeholder="John Doe"
            className={`p-2 mb-3 rounded-lg border shadow-xl ${validName === true ? "text-blue-500 border-blue-500" : validName === false ? "text-red-500 border-red-500" : '' }`}
            onChange={this.handleChange}
          />
          <br />
          <label>Specialty</label>
          <br />
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
          <br />
          <div className="w-full text-center">
          <input
            type="submit"
            value="Signup"
            className="border border-blue-300 bg-blue-300 pt-2 pb-2 rounded-lg w-52 shadow-xl"
            />
            </div>
        </form>
      </div>
    );
  }
}

export default withAuth(Signup);
