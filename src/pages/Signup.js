import React, { Component } from "react";
import { Link } from "react-router-dom";
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
      <div>
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
          <label>Specialty:</label>
          <select value={specialty} onChange={this.handleDropdown}>
            {
              specialtiesArr.map(
                (elem, index) => {
                  return elem === specialty ? <option key={index} id="specialty" value={elem} defaultValue >{elem}</option> : <option key={index} name="specialty" value={elem} >{elem}</option>
                }
                  )
            }
          </select>
          <input type="submit" value="Signup" />
          <br />
        </form>
        <p>
          Already have account?
          <Link to={"/login"}> Login</Link>
        </p>
      </div>
    );
  }
}

export default withAuth(Signup);
