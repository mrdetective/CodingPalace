import React, {useEffect, useState} from "react";
import Navbar from "../components/navbar";
import CodeEditor from "../components/Code-Editor";
import IO from "../components/IO";
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
function Nest() {
  const [code, setCode] = useState("");
  const [savebtn, setsavebtn] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    language: "javascript",
    id: "63",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const filename = location.state;
  useEffect(() => {
    if (filename) {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        "Content-Type": "application/json",
      };
      const fetchOptions = {
        method: "GET",
        headers: headers,
      };
      fetch(`${process.env.REACT_APP_FILES_LINK}/${filename}`, fetchOptions)
        .then((response) => {
          if (!response.ok) {
            toast("Sorry but the filename doesnot exist!", {
              icon: "⚠️",
              autoClose: 1000,
              position: "top-center",
              style: {
                borderRadius: "5px",
                background: "#333131",
                color: "whitesmoke",
              },
            });
            navigate("/dashboard");
          } else {
            return response.json();
          }
        })
        .then((data) => {
          if (!data) {
            toast("Sorry but the filename doesnot exist!", {
              icon: "⚠️",
              autoClose: 1000,
              position: "top-center",
              style: {
                borderRadius: "5px",
                background: "#333131",
                color: "whitesmoke",
              },
            });
            navigate("/dashboard");
          }
          setsavebtn(true);
        })
        .catch((err) => {
          toast("Sorry but the filename doesnot exist!", {
            icon: "⚠️",
            autoClose: 1000,
            position: "top-center",
            style: {
              borderRadius: "5px",
              background: "#333131",
              color: "whitesmoke",
            },
          });
          navigate("/dashboard");
        });
    } else {
      setsavebtn(false);
      if (location.pathname.length > 5) {
        toast("Sorry but the filename doesnot exist!", {
          icon: "⚠️",
          autoClose: 1000,
          position: "top-center",
          style: {
            borderRadius: "5px",
            background: "#333131",
            color: "whitesmoke",
          },
        });
        navigate("/dashboard");
      }
    }
  }, []);
  return (
    <div>
      <Navbar backgroundColor={"#303030"} />
      <div className="bigbox">
        <CodeEditor
          code={code}
          setCode={setCode}
          selectedLanguage={selectedLanguage.language}
          setSelectedLanguage={setSelectedLanguage}
          savebtn={savebtn}
          setsavebtn={setsavebtn}
        />
        <IO
          backgroundColor={"rgb(43 37 37)"}
          code={code}
          selectedLanguage={selectedLanguage}
        />
      </div>
    </div>
  );
}

export default Nest;
