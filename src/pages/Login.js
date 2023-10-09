import React from "react";
import Navbar from "../components/navbar";
import logingif from "../assets/logingif.gif";
import {Link} from "react-router-dom";

function Login() {
  return (
    <div style={{background: "blue"}}>
      <Navbar />
      <div className="bigbox">
        <div className="main-login-box">
          <div className="login-box">
            <img className="login-gif" src={logingif} />
            <input
              placeholder="Enter your email address"
              className="login-email"
              type="email"
            />
            <input
              placeholder="Enter your passwod"
              className="login-password"
              type="password"
            />
            <button className="login-btn">Log in</button>
            <div className="create-account-text">
              If you don't have an account, you can{" "}
              <Link to="/createaccount">create</Link> one
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
