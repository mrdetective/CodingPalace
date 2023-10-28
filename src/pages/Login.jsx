import React, {useState} from "react";
import Navbar from "../components/navbar";
import logingif from "../assets/logingif.gif";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import view from "../assets/view.png";
import hide from "../assets/hide.png";

function Login() {
  sessionStorage.removeItem("data");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const submitDetails = async () => {
    setloading(true);
    if (!email || !password) {
      toast("No field should be empty", {
        icon: "⚠️",
        autoClose: 1000,
        position: "top-center",
        style: {
          borderRadius: "5px",
          background: "#333131",
          color: "whitesmoke",
        },
      });
      setloading(false);
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
      .then((data) => {
        if (data.accessToken) {
          localStorage.setItem("AccessToken", data.accessToken);
          navigate("/dashboard");
        } else {
          toast("Invalid credentials!", {
            icon: "⚠️",
            autoClose: 1000,
            position: "top-center",
            style: {
              borderRadius: "5px",
              background: "#333131",
              color: "whitesmoke",
            },
          });
        }
        setloading(false);
      })
      .catch((error) => {
        toast("Invalid credentials!", {
          icon: "⚠️",
          autoClose: 1000,
          position: "top-center",
          style: {
            borderRadius: "5px",
            background: "#333131",
            color: "whitesmoke",
          },
        });
      });
  };
  const toggleEyeIcon = () => {
    setShowPassword(!showPassword);
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
              type={!showPassword ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              onClick={toggleEyeIcon}
              className="eye-icon"
              src={!showPassword ? hide : view}></img>
            <button onClick={submitDetails} className="login-btn">
              <p style={{display: loading ? "none" : ""}}>Login</p>
              <div
                className="lds-ring2"
                style={{display: !loading ? "none" : ""}}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
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
