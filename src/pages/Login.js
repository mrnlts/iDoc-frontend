import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { withAuth } from "../providers/AuthProvider";
import Button from "../components/Button";

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      missingEmail: false,
      missingPassword: false,
    };
  }

  handleFormSubmit = async(event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.setState({ missingEmail: false, missingPassword: false });
 
    if (!email || !password) {
      if (!email && password) {
        toast.error('Please fill in all the fields', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return this.setState({ missingEmail: true })
      } else if (!password && email) {
        toast.error('Please fill in all the fields', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return this.setState({ missingPassword: true })
      } else {
        toast.error('Please fill in all the fields', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return this.setState({missingEmail: true, missingPassword: true})
      }
    } else {
      return this.props.login({
        email,
        password
      })
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password, missingEmail, missingPassword } = this.state;
    return (
      <div className="flex flex-col h-screen justify-evenly items-center">
        {missingEmail || missingPassword ?
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
        /> : ""}
        <form onSubmit={this.handleFormSubmit}>
            <label>E-mail</label>
            <br />
          <input
            type="text"
            name="email"
              value={email}
              placeholder="example@gmail.com"
              className={`p-2 mb-3 w-full rounded-lg border shadow-xl ${ missingEmail ? "text-red-500 border-red-500" : ""} `}
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
              className={`p-2 mb-3 w-full rounded-lg border shadow-xl ${ missingPassword ? "text-red-500 border-red-500" : ""} `}
            onChange={this.handleChange}
            />
            <br />
            <div className="w-full text-center">
            <Button input>Log in</Button>
              </div>
          </form>
        </div>
    );
  }
}

export default withAuth(Login);
