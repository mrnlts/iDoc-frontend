import React, { Component } from "react";
import { withAuth } from "../providers/AuthProvider";
import specialtiesArr from '../data';
class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
    email: "",
    password: "",
    name: "",
    specialty: ""
  };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { email, password, name, specialty } = this.state;
    this.props.signup({ email, password, name, specialty });
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
    const { email, password, name, specialty } = this.state;

    return (
      <div className="flex flex-col h-screen justify-evenly items-center">
        <form onSubmit={this.handleFormSubmit}>
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
            placeholder="*****************"
            className="p-2 mb-3 rounded-lg shadow-xl"
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
            className="p-2 mb-3 rounded-lg shadow-xl"
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
