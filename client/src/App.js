import "./App.css";
import React, { useState } from "react";
import Register from "./Component/Register/Register";
import Login from "./Component/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Component/Homepage/Homepage";

const App = () => {
  const [user, setLoginUser] = useState({});

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              user && user._id ? (
                <Homepage setLoginUser={setLoginUser} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          ></Route>
          <Route
            path="/login"
            element={<Login setLoginUser={setLoginUser} />}
          ></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
