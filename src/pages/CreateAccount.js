import React from "react";
import Navbar from "../components/navbar";
import logingif from "../assets/logingif.gif";
import {Link} from "react-router-dom";

function CreateAccount() {
  return (
    <div>
      <Navbar />{" "}
      <div className="bigbox">
        <div className="main-createaccount-box">
          <div className="createaccount-box">
            <img className="create-account-gif" src={logingif} />
            <input
              placeholder="Enter your Name"
              className="createaccount-name"
            />
            <input
              placeholder="Enter your email address"
              className="createaccount-email"
              type="email"
            />
            <input
              placeholder="Enter your passwod"
              className="createaccount-password"
              type="password"
            />
            <input
              placeholder="Re-enter your passwod"
              className="createaccount-repassword"
              type="password"
            />
            <button className="createaccount-btn">Sign up</button>
            <div className="create-account-text">
              If you already have an account, you can{" "}
              <Link to="/login">login</Link> here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
