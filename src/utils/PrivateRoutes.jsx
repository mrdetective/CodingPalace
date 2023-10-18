import {Navigate, Outlet} from "react-router-dom";
import {toast} from "react-toastify";

const PrivateRoutes = () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
    "Content-Type": "application/json",
  };
  const fetchOptions = {
    method: "GET",
    headers: headers,
  };
  let reponseisOk = true;
  fetch(process.env.REACT_APP_FILES_LINK, fetchOptions)
    .then((response) => {
      if (!response.ok) {
        toast("Login to use dashboard!", {
          icon: "⚠️",
          autoClose: 1000,
          position: "top-center",
          style: {
            borderRadius: "5px",
            background: "#333131",
            color: "whitesmoke",
          },
        });
        reponseisOk = false;
      } else {
        return response.json();
      }
    })
    .then((data) => {})
    .catch((error) => {
      toast("Login to use dashboard!", {
        icon: "⚠️",
        autoClose: 1000,
        position: "top-center",
        style: {
          borderRadius: "5px",
          background: "#333131",
          color: "whitesmoke",
        },
      });
      reponseisOk = false;
    });
  return reponseisOk ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
