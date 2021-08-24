import React from "react";

const Button = (props) => {
  const { black, gray, small, big, clickAction, input, placeholder } = props;

  const handleClick = (event) => {
    if (clickAction) {
      return clickAction(event); 
    };
  }             
  
  const style = `border ${gray ? "bg-gray-400" : "border-blue-300 bg-blue-300"} pt-2 pb-2 placeholder-white rounded-md ${black ? "text-black" : "text-white"} ${small ? "w-20" : big ? "w-60" : "w-52"} shadow-xl`;
  
  if (input) {
    return <input type="submit" className={style} onClick={handleClick} value={props.children} placeholder={placeholder}/>
  }
  
  return <button className={style} onClick={handleClick}>{props.children}</button>
}

export default Button;