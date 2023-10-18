import React, {useEffect, useState} from "react";
import Navbar from "../components/navbar";
import {useNavigate, Link} from "react-router-dom";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import plus from "../assets/plus-icon.png";
import code from "../assets/code.png";
import trashCan from "../assets/trash-can.png";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {height} from "@mui/system";
import folders from "../assets/folders.png";
import trash from "../assets/trash.png";

function Dashboard() {
  const navigate = useNavigate();
  const [openCreateFileDialog, handleCreateFileDisplay] = useState(false);
  const [openDeleteFileDialog, handleDeleteFileDisplay] = useState(false);
  const [files, setfiles] = useState([]);
  const [filename, setfilename] = useState("");
  const [fileindex, setfileIndex] = useState(-1);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
      "Content-Type": "application/json",
    };
    const fetchOptions = {
      method: "GET",
      headers: headers,
    };
    fetch(process.env.REACT_APP_FILES_LINK, fetchOptions)
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          navigate("/login");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        // console.log(data[0]._id);
        const newfiles = [];
        data.forEach((element) => {
          var newfile = {
            id: data[0]._id,
            filename: element.file_name,
            language: element.language,
            dateCreated: element.date_created,
            lastEdited: element.last_edited,
          };
          newfiles.push(newfile);
        });
        setfiles(newfiles);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCreateFileDialogClose = () => {
    handleCreateFileDisplay(false);
  };

  const handleCreateFileDialogOpen = () => {
    handleCreateFileDisplay(true);
  };

  const handleDeleteFileDialogOpen = (index) => {
    setfileIndex(index);
    handleDeleteFileDisplay(true);
  };

  const handleDeleteFileDialogClose = () => {
    handleDeleteFileDisplay(false);
  };

  const dialogStyle = {
    padding: "20px",
    height: "20rem",
    width: "30rem",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#282828",
    overflowY: "hidden",
  };

  const createfile = () => {
    const date = new Date();
    const newfile = {
      file_name: filename,
      code: btoa(""),
      theme: "vs-dark",
      language: "Javascript",
      date_created: `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`,
      last_edited: `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`,
    };
    const newfiles = [
      ...files,
      {
        filename: filename,
        language: "Javascript",
        dateCreated: `${date.getDate()}-${
          date.getMonth() + 1
        }-${date.getFullYear()}`,
        lastEdited: `${date.getDate()}-${
          date.getMonth() + 1
        }-${date.getFullYear()}`,
      },
    ];
    setfiles(newfiles);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
      "Content-Type": "application/json",
    };
    const fetchOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newfile),
    };
    fetch(process.env.REACT_APP_FILES_LINK, fetchOptions)
      .then((response) => {
        if (!response.ok) {
          navigate("/login");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    setfilename("");
  };
  const DeleteFile = () => {
    const updatedFiles = [...files];
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
      "Content-Type": "application/json",
    };
    const fetchOptions = {
      method: "DELETE",
      headers: headers,
    };
    fetch(
      `${process.env.REACT_APP_FILES_LINK}/${updatedFiles[fileindex].filename}`,
      fetchOptions
    )
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
          navigate("/login");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
      })
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
        navigate("/login");
      });
    updatedFiles.splice(fileindex, 1);
    setfiles(updatedFiles);
  };
  return (
    <div>
      <Navbar backgroundColor={"rgb(23 22 22)"} />
      <div className="bigbox">
        <div className="file-box">
          <h2 className="filebox-heading">
            Your files{" "}
            <span className="file-limit-notice">
              (Note: You cannot add more than 8 files at a time)
            </span>
          </h2>
          <div className="file-list">
            {files.map((file, index) => {
              return (
                <div className="files" key={`${file.id}`}>
                  <div className="thumbnail">
                    <img className="thumbnail-img" src={code} alt="Thumbnail" />
                  </div>
                  <div
                    className="filename"
                    onClick={(e) => {
                      navigate(`/dashboard/${file.filename}`, {
                        state: file.filename,
                      });
                    }}>
                    {file.filename}
                  </div>
                  <div className="programming-language">
                    Language: {file.language}``
                  </div>
                  <div className="date-created">
                    Date-Created: {file.dateCreated}
                  </div>
                  <div className="last-edited">
                    Last-Edited: {file.lastEdited}
                  </div>
                  <img
                    src={trashCan}
                    className="trash-can"
                    onClick={() => {
                      handleDeleteFileDialogOpen(index);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <button onClick={handleCreateFileDialogOpen} className="add-files">
        Add Files
      </button>
      <Dialog onClose={handleCreateFileDialogClose} open={openCreateFileDialog}>
        <img className="folder-img" src={folders} />
        <h3 style={dialogStyle}>
          <input
            placeholder="Enter the file name"
            className="filename-input"
            type="text"
            value={filename}
            onChange={(e) => setfilename(e.target.value)}
          />
          <button
            onClick={(event) => {
              createfile();
              handleCreateFileDialogClose();
            }}
            className="create-file-btn">
            Create
          </button>
        </h3>
      </Dialog>
      <Dialog onClose={handleDeleteFileDialogClose} open={openDeleteFileDialog}>
        <img className="trash-can-img" src={trash} />
        <h3 style={dialogStyle}>
          <div className="delete-msg">
            Are you sure that you want to delete the file?
          </div>
          <button
            onClick={(event) => {
              DeleteFile();
              handleDeleteFileDialogClose();
            }}
            className="delete-file-btn">
            Delete
          </button>
          <button
            onClick={handleDeleteFileDialogClose}
            className="delete-cancel-file-btn">
            Cancel
          </button>
        </h3>
      </Dialog>
    </div>
  );
}

export default Dashboard;
