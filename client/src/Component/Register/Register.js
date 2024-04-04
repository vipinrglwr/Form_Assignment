import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });

    console.log("e " + e);
    console.log("name " + name);
    console.log("value " + value);
  };

  const register = () => {
    const { name, email, password, reEnterPassword } = user;
    if (name && email && password && password === reEnterPassword) {
      alert("posted");
      axios.post("http://localhost:9002/register", user).then((res) => {
        alert(res.data.message);
        navigate("/login");
      });
    } else {
      alert("Invalid Input");
    }
  };

  return (
    <div className="register">
      {console.log(user)}
      <h1>Register</h1>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Enter Your Name"
      />
      <input
        type="text"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Enter Your Email"
      />
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Enter Your Password"
      />
      <input
        type="password"
        name="reEnterPassword"
        value={user.reEnterPassword}
        onChange={handleChange}
        placeholder="Re-enter Password"
      />
      <div className="button" onClick={register}>
        Register
      </div>
      <div>or</div>
      <div className="button" onClick={() => navigate("/login")}>
        Login
      </div>
    </div>
  );
};

export default Register;
