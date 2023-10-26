import React, {useEffect, useState} from "react";
import planet from "../assets/planetrevolving2.gif";
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setotp] = useState("");
  let data = location.state;
  useEffect(() => {
    if (
      !data ||
      !data.sendData.email ||
      !data.sendData.password ||
      !data.sendData.name
    ) {
      toast("Sorry error occured", {
        icon: "⚠️",
        autoClose: 1000,
        position: "top-center",
        style: {
          borderRadius: "5px",
          background: "#333131",
          color: "whitesmoke",
        },
      });
      navigate("/");
    } else {
      data = data.sendData;
    }
  }, []);
  const verifyotp = async () => {
    const details = {
      name: data.name,
      email: data.email,
      password: data.password,
      otp: otp,
    };
    const response = await fetch(process.env.REACT_APP_CREATE_ACCOUNT_LINK, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(details),
    });
    if (response.ok) {
      navigate("/login");
    } else {
      toast("The otp is not correct", {
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
  };
  return (
    <div>
      <div className="bigbox">
        <div className="otp-box">
          <img className="otp-img" src={planet} />
          <h1 className="otp-heading">Enter otp</h1>
          <p className="otp-note">**check your spam box</p>
          <input
            placeholder="Enter otp that is sent in yout email"
            className="otp-input"
            type="number"
            onChange={(e) => {
              setotp(e.target.value);
            }}
            value={otp}
          />
          <button className="verify-otp-btn" onClick={verifyotp}>
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;
