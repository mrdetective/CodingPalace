import React, {useEffect, useState} from "react";
import planet from "../assets/planetrevolving2.gif";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function VerifyOtp() {
  const navigate = useNavigate();
  const [otp, setotp] = useState("");
  let data = JSON.parse(sessionStorage.getItem("data"));
  const [loading, setloading] = useState(false);
  useEffect(() => {
    if (!data || !data.email || !data.password || !data.name) {
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
    }
  }, []);
  const resendotp = async () => {
    const name = data.name,
      email = data.email,
      password = data.password;
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
      navigate("/verify-otp", {
        state: {sendData},
      });
    } else {
      toast("Error occured", {
        icon: "⚠️",
        autoClose: 3000,
        position: "top-center",
        style: {
          borderRadius: "5px",
          background: "#333131",
          color: "whitesmoke",
        },
      });
      navigate("/login");
    }
  };
  const verifyotp = async () => {
    setloading(true);
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
      sessionStorage.removeItem("data");
      toast("Account created successfully!", {
        icon: "✅",
        autoClose: 1000,
        position: "top-center",
        style: {
          borderRadius: "5px",
          background: "#333131",
          color: "whitesmoke",
        },
      });
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
    setloading(false);
  };
  return (
    <div>
      <div className="bigbox">
        <div className="otp-box">
          <img className="otp-img" src={planet} />
          <h1 className="otp-heading">Enter otp</h1>
          <p className="otp-note">**check your spam box</p>
          <p className="resend-otp">
            Please{" "}
            <span onClick={resendotp} className="resend-link">
              resend
            </span>{" "}
            the OTP if you didn't receive it.
          </p>
          <input
            placeholder="Enter otp that is sent in yout email"
            className="otp-input"
            type="password"
            onChange={(e) => {
              setotp(e.target.value);
            }}
            maxLength="6"
            value={otp}
          />
          <button className="verify-otp-btn" onClick={verifyotp}>
            <p style={{display: loading ? "none" : ""}}>Verify</p>
            <div
              className="lds-ring2"
              style={{display: !loading ? "none" : ""}}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;
