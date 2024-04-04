import React from "react";
import "./homepage.css";

const Homepage = ({ setLoginUser }) => {
  return (
    <div>
      <div className="homepage">
        <h1>Hello Homepage</h1>
        <button className="button" onClick={() => setLoginUser({})}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Homepage;
