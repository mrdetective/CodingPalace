import React, {useState} from "react";
import Navbar from "../components/navbar";
import logingif from "../assets/loginanimation.json";
import {Link, json, useNavigate} from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import wrongimg from "../assets/wrong.png";
import Lottie from "lottie-react";

function CreateAccount() {
  sessionStorage.removeItem("data");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setrepassword] = useState("");
  const [name, setName] = useState("");
  const [openCreateFileDialog, handleCreateFileDisplay] = useState(false);
  const [Errmsg, setErrmsg] = useState("");
  const [loading, setloading] = useState(false);

  const handleCreateFileDialogClose = () => {
    handleCreateFileDisplay(false);
  };

  const handleCreateFileDialogOpen = (message) => {
    handleCreateFileDisplay(true);
    setErrmsg(message);
  };

  const dialogStyle = {
    padding: "20px",
    height: "12rem",
    width: "25rem",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#282828",
    overflowY: "hidden",
  };

  const submitDetails = async () => {
    setloading(true);
    let res = /\S+@\S+\.\S+/.test(email);
    let checkPassword = password === repassword;
    let emptyField = !email || !password || !name;
    if (res && checkPassword && !emptyField) {
      try {
        const data = {
          email: email,
        };
        const response = await fetch(process.env.REACT_APP_SEND_OTP, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          const sendData = {
            name: name,
            email: email,
            password: password,
          };
          sessionStorage.setItem("data", JSON.stringify(sendData));
          setloading(false);
          navigate("/verify-otp");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setloading(false);
      if (!res) {
        handleCreateFileDialogOpen("The email is not valid");
      } else if (!checkPassword) {
        handleCreateFileDialogOpen("The passwords did not match");
      } else {
        handleCreateFileDialogOpen("Fields cannot be empty");
      }
    }
  };

  return (
    <div>
      <Navbar />{" "}
      <div className="bigbox">
        <div className="main-createaccount-box">
          <div className="createaccount-box">
            <Lottie className="create-account-gif" animationData={logingif} />
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
              <p style={{display: loading ? "none" : ""}}>Sign up</p>
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
              If you already have an account, you can{" "}
              <Link to="/login">login</Link> here
            </div>
          </div>
        </div>
      </div>
      <Dialog onClose={handleCreateFileDialogClose} open={openCreateFileDialog}>
        <h3 style={dialogStyle}>
          <img src={wrongimg} className="err-img" />
          <div className="err-msg">{Errmsg}</div>
          <button className="err-btn" onClick={handleCreateFileDialogClose}>
            OK
          </button>
        </h3>
      </Dialog>
    </div>
  );
}

export default CreateAccount;
