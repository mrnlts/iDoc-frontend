import React, { Component } from 'react';

class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      value: "",
      missingValue: false,
    }
  }

  async componentDidMount () {
    const { children, missingValue } = this.props;
    const id = children;
    await this.setState({ id, missingValue });
  }

  handleChange = event => {
    const { value } = event.target;
    this.setState({ value });
    this.props.changeAction(event);
  };
  
  render() {
    const { id, value, missingValue } = this.state;
    const { valid, placeholder } = this.props;
    
    return <div>
      <input
        type={id === "email" ? "text" : id === "password" ? "password" : id === "birthDate" ? "date" : id === "phoneNr" || id === "height" || id === "weight" ? "number" : "text"}
        id={id}
        value={value}
        placeholder={placeholder}
        className={`mb-3 w-full rounded-lg border shadow-xl ${id === "birthDate" || id === "phoneNr" || id === "height" || id === "weight" ? "text-gray-400" : ""} ${id === "birthDate" ? "text-sm pl-1 pb-2 pt-2" : "p-2"} ${missingValue ? "text-red-500 border-red-500" : ""} ${valid === true ? "text-blue-500 border-blue-500" : valid === false ? "text-red-500 border-red-500" : ''}`}
        onChange={this.handleChange}
        inputMode={id === "phoneNr" || id === "height" || id === "weight" ? "numeric" : ""}
        required
      />
        {id === "password" && valid === false ? <div className=" w-full text-xs">8 characters long, 1 number and 1 uppercase letter</div> : ''}
      <br />
    </div>
  }
}

export default FormInput;