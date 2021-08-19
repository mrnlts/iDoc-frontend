import React, { Component } from 'react';

class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      value: "",
      valid: null,
      missingValue: false,
    }
  }

  async componentDidMount () {
    const { children, valid, missingValue } = this.props;
    const id = children;
    await this.setState({ id, valid, missingValue });
  }

  handleChange = event => {
    const { value } = event.target;
    this.setState({ value });
    this.props.changeAction(event);
  };
  
  render() {
    const { id, value, missingValue } = this.state;
    
    return <div>
      <input
        type={id === "email" ? "text" : id === "password" ? "password" : "text"}
        id={id}
        value={value}
        placeholder={id === "email" ? "example@gmail.com" : id === "password" ? "*****************": ""}
        className={`p-2 mb-3 w-full rounded-lg border shadow-xl ${missingValue ? "text-red-500 border-red-500" : ""}`}
        onChange={this.handleChange}
        />
      <br />
    </div>
  }
}

export default FormInput;