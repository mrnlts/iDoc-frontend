import React, { Component } from 'react';
import authClient from '../lib/authClient';
import { toast, ToastContainer } from "react-toastify";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPatient: undefined, 
      height: '',
      weight: '',
      email: '',
      phoneNr: '',
      appointments: [],
      conditions: []
    }
  }

  async componentDidMount() {
    const user = await authClient.whoami();
    const { isPatient, height, weight, email, phoneNr, appointments, conditions } = user;
    if (isPatient) {
      this.setState({
        isPatient, height, weight, email, phoneNr, appointments, conditions
      });
    } else {
      this.props.history.push('/home');
    }
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { email, phoneNr } = this.state;
    try {
      await authClient.updateMe({ email, phoneNr });
      await toast.success('Updated!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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

  render() {
    const { height, weight, email, phoneNr, conditions } = this.state;
    
    return (
      <div>
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
        <div className="w-full flex flex-col justify-center items-center mt-10 mb-20">
          <p className="text-xl font-bold mb-5">Your clinical history</p>
          <div className="flex justify-between w-52">
              <div className="w-1/2 pr-1">
                <label>Height</label>
                <br />
                <input
                  value={height}
                  className="pt-2 pb-2 pl-1 mb-3 w-full rounded-lg shadow-xl"
                  readOnly
              />
              </div>
              <div className="w-1/2 pl-2">
                <label>Weight</label>
                <br />
                <input
                  value={weight}
                  className="pt-2 pb-2 pl-1 mb-3 w-full rounded-lg shadow-xl"
                  readOnly
                />
                </div>
          </div>
          <ul>
            {conditions.length === 0 ? "No conditions registered yet" : conditions.map((condition, index) => {
              return <li key={index} className="list-disc">
                {condition}<br />
              </li>
            })
            }
            </ul>
        </div>
        
        <div className="w-full flex flex-col justify-center items-center">
          <p className="text-xl font-bold mb-3">Contact info</p>
          <form onSubmit={this.handleFormSubmit} className="w-3/4">
            <label>Email </label>
            <br />
              <input
                id="email"  
                value={email}
                  className="p-2 mb-3 w-full rounded-lg shadow-xl"
                  onChange={this.handleChange}
                  />
            <br />
            {phoneNr ? <label>Phone Nr <br /></label> : ''}
            {phoneNr ? <input
              id="phoneNr"
              value={phoneNr}
              className="p-2 mb-3 w-full rounded-lg shadow-xl"
              onChange={this.handleChange}
            /> : ''}
            <div className="w-full text-center">
              <input type="submit" value="Update" className="border border-blue-300 mt-3 bg-blue-300 pt-2 pb-2 rounded-lg w-1/3 shadow-xl" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Profile;
