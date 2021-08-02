import React from "react";

const About = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center text-justify w-full">
      <div className="text-left">
        <p className="text-2xl font-bold mb-5">About <span><img src="./logo.png"/></span></p>
        </div>
        <p className="w-3/4 text-sm">iDoc is a single-page app (SPA) where health professionals and patients meet, designed using ReactJS, ExpressJS and deployed with Heroku and Netlify. </p>
        <br />
        <p className="w-3/4 text-sm">With iDoc, you can access your clinical history or request appointments easily, knowing that your data is being treated with confidentiality.</p>
      <br />
      <br />
        <p>Developed by <span><a href="https://github.com/mrnlts" target="_blank" rel="noreferrer" className="text-blue-500">marinaCodes.</a></span></p>
    </div>
  );
}

export default About;
