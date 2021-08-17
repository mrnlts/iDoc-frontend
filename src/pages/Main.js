import React from "react";
import { Link } from 'react-router-dom';
import Button from "../components/Button";

const Main = (props) => {
  const { isLoggedIn } = props;
  return (
    <div className="h-screen flex flex-col justify-center items-center ">
      <Link to={isLoggedIn ? "/home" : "/"} ><img className="w-52 pb-7 " src="./logo.png" /></Link>
      <p className="pb-10 text-xl text-center">Welcome to your personal <br /> space for digital health</p>
      <div className="flex flex-col h-1/5 justify-around">
        <Link to="/login" ><Button black>Log in</Button></Link>
        <Link to="/signup" ><Button black>Sign up</Button></Link>
      </div>
    </div>
  );
}

export default Main;
