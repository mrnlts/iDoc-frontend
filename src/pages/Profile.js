import React, { Component } from 'react';
import authClient from '../lib/authClient';
import { toast, ToastContainer } from "react-toastify";
import Button from '../components/Button';
import FormInput from '../components/FormInput';

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
      await toast.success('Updated!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      await authClient.updateMe({ email, phoneNr });
    } catch (e) {
      console.log(e)
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
              <div className="w-1/2 pr-1 text-center">
                <label>Height</label>
                <div className="pt-2 pb-2 bg-gray-200 pl-1 mb-3 w-full rounded-lg shadow-xl">
                  {height} cm
                </div>
              </div>
            
              <div className="w-1/2 pl-2 text-center">
                <label>Weight</label>
                <div className="pt-2 pb-2 bg-gray-200 pl-1 mb-3 w-full rounded-lg shadow-xl">
                  {weight} kg
                </div>
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
            {email ? <label>Email </label> : ""}
            {email ? <FormInput black value={email} changeAction={this.handleChange}>email</FormInput> : ""}

            {phoneNr ? <label>Phone Nr <br /></label> : ''}
            {phoneNr ? <FormInput black value={phoneNr} changeAction={this.handleChange}>phoneNr</FormInput> : ''}
            <div className="w-full text-center">
              <Button black input>Update</Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Profile;
