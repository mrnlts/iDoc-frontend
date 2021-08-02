import React, { Component } from "react";
import { withAuth } from "../providers/AuthProvider";


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.login({
      email, 
      password
    })
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="flex flex-col h-screen justify-evenly items-center">
      <form onSubmit={this.handleFormSubmit}>
          <label>E-mail</label>
          <br />
        <input
          type="text"
          name="email"
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
          name="password"
            value={password}
            placeholder="*****************"
            className="p-2 mb-10 rounded-lg shadow-xl"
          onChange={this.handleChange}
          />
          <br />
          <div className="w-full text-center">
          <input
            type="submit"
            value="Login"
            className="border border-blue-300 bg-blue-300 pt-2 pb-2 rounded-lg w-52 shadow-xl"
            />
            </div>
        </form>
        </div>
    );
  }
}

export default withAuth(Login);
