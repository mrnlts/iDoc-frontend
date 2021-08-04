import React from 'react';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center text-center h-screen pt-10">
      <div className="flex flex-col justify-center items-center w-3/4">
      <img src="./error-404.png" />
      <img src="./error-404-text.png" />
      <p className="text-2xl">Patient not found :-(</p>
      </div>
      </div>
  )
}

export default ErrorPage;