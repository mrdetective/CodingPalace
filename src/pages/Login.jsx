import React, {useState} from "react";
import Navbar from "../components/navbar";
import logingif from "../assets/logingif.gif";
import {Link} from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitDetails = async () => {
    if (!email || !password) {
      console.log("No field should be empty");
      return;
    }
    const data = {
      email: email,
      password: password,
    };
    fetch(process.env.REACT_APP_LOGIN_LINK, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        console.log("Incorrect email or password");
      });
  };
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Enter your password"
              className="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={submitDetails} className="login-btn">
              Log in
            </button>
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
