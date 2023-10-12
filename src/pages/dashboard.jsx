import React, {useEffect, useState} from "react";
import Navbar from "../components/navbar";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import plus from "../assets/plus-icon.png";

function Dashboard({user, setUser}) {
  const navigate = useNavigate();
  const [toastDisplayed, setToastDisplayed] = useState(false);
  // useEffect(() => {
  //   if (!user && !toastDisplayed) {
  //     toast("Login to use dashboard!", {
  //       icon: "⚠️",
  //       autoClose: 1000,
  //       position: "top-center",
  //       style: {
  //         borderRadius: "5px",
  //         background: "#333131",
  //         color: "whitesmoke",
  //       },
  //     });
  //     navigate("/");
  //     setToastDisplayed(true);
  //   }
  // }, []);
  return (
    <div>
      <Navbar />
      <div className="bigbox">
        <div className="file-box">
          <button className="add-files">
            <img className="plus-icon" src={plus} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
