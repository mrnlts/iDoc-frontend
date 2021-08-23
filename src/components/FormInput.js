import React, { Component } from 'react';

class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      missingValue: false,
    }
  }

  async componentDidMount () {
    const { missingValue, value } = this.props;
    
    await this.setState({ missingValue, value });
  }

  handleChange = event => {
    const { changeAction } = this.props;
    const { value } = event.target;

    this.setState({ value });
    changeAction(event);
  };
  
  render() {
    const { value, missingValue } = this.state;
    const { children, valid, placeholder, black, blue, semi, sixty } = this.props;
    const id = children;
    const style = `mb-3 w-full rounded-lg border shadow-xl ${!black ? "text-gray-400" : ""} ${blue ? "bg-blue-300 border-blue-300 placeholder-white text-white pl-12" : ""} ${id === "birthDate" ? "text-sm pl-1 pb-2 pt-2" : "p-2"} ${missingValue ? "text-red-500 border-red-500" : ""} ${valid === true ? "text-blue-500 border-blue-500" : valid === false ? "text-red-500 border-red-500" : ''}`;

    return <div className={`m-auto ${semi ? "w-2/3" : sixty ? "w-60" : ""}`}>
      <input
        type={id === "email" ? "text" : id === "password" ? "password" : id === "birthDate" || id === "reqDate" ? "date" : id === "phoneNr" || id === "height" || id === "weight" ? "number" : "text"}
        id={id}
        value={value}
        placeholder={placeholder}
        className={style}
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