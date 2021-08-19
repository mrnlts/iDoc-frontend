import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { withAuth } from "../providers/AuthProvider";
import Button from "../components/Button";
import FormInput from "../components/FormInput";

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
    const { id, value } = event.target;
    this.setState({ [id]: value });
    console.log(this.state)
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
        <form onSubmit={this.handleFormSubmit} className="w-4/5">
          <label>E-mail</label>
          <FormInput value={email} missingValue={ missingEmail} valid changeAction={this.handleChange}>email</FormInput>
          <label>Password</label>
          <FormInput value={password} missingValue={ missingPassword} valid changeAction={this.handleChange}>password</FormInput>
          <div className="w-full text-center mt-7">
            <Button input>Log in</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default withAuth(Login);
