import React, { Component } from 'react';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.rest.user.email,
      phoneNr: this.props.rest.user.phoneNr
    }
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { email, phoneNr } = this.state;
    this.props.rest.updateContactInfo({ email, phoneNr });
  };

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  render() {
    const { email, phoneNr } = this.state;
    return (
      <div>
        <h1>Contact info</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label>Email: </label>
          <br />
          <input id="email" value={email} onChange={this.handleChange} />
          <br />
          {phoneNr ? <label>Phone Nr: <br /></label> : ''}
          {phoneNr ? <input id="phoneNr" value={phoneNr} onChange={this.handleChange} /> : ''}
          <input type="submit" value="Update" style={{ "display": "block" }} />
        </form>
      </div>
    );
  }
}

export default Profile;
