import React, {useState} from "react";
import Navbar from "../components/navbar";
import logingif from "../assets/logingif.gif";
import {Link, useNavigate} from "react-router-dom";

function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setrepassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const submitDetails = async () => {
    let res = /\S+@\S+\.\S+/.test(email);
    let checkPassword = password === repassword;
    let emptyField = !email || !password || !name;
    if (res && checkPassword && !emptyField) {
      try {
        const data = {
          name: name,
          email: email,
          password: password,
        };
        const response = await fetch(
          process.env.REACT_APP_CREATE_ACCOUNT_LINK,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (response.ok) {
          navigate("/login", {replace: true});
        } else {
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      if (!res) {
        console.log("The email is not valid");
      } else if (!checkPassword) {
        console.log("The passwords do not match");
      } else {
        console.log("Fields cannot be empty");
      }
    }
  };

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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Enter your email address"
              className="createaccount-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Enter your password"
              className="createaccount-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              placeholder="Re-enter your password"
              className="createaccount-repassword"
              type="password"
              value={repassword}
              onChange={(e) => setrepassword(e.target.value)}
            />
            <button className="createaccount-btn" onClick={submitDetails}>
              Sign up
            </button>
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
