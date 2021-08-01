import React from "react";
import { Link } from 'react-router-dom';

const Main = (props) => {
  const { isLoggedIn } = props;
  return (
    <div className="h-full flex flex-col justify-center items-center ">
      <Link to={isLoggedIn ? "/home" : "/"} ><img className="w-52 pb-7 " src="./logo.png" /></Link>
      <p className="pb-5 text-xl text-center">Welcome to your personal <br /> space for digital health</p>
      <div className="flex flex-col h-1/5 justify-around">
        <Link to="/login" ><button className="border border-blue-300 bg-blue-300 pt-1 pb-1 rounded-md w-52">Log in</button></Link>
        <Link to="/signup" ><button className="border border-blue-300 bg-blue-300 pt-1 pb-1 rounded-md w-52">Sign up</button></Link>
      </div>
    </div>
  );
}

export default Main;
