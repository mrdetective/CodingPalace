import React from "react";
import runimg from "../assets/run.png";
import axios from "axios";

function IO({backgroundColor, code, selectedLanguage}) {
  async function CheckStatus(token) {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_SUBMISSION_URL + "/" + token,
      params: {
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_RAPIDAPI_HOST,
      },
    };
    try {
      const response = await axios.request(options);
      console.log(atob(response.data.stdout));
    } catch (error) {
      console.error(error);
    }
  }
  async function compile() {
    console.log(selectedLanguage.language, parseInt(selectedLanguage.id));
    const options = {
      method: "POST",
      url: process.env.REACT_APP_SUBMISSION_URL,
      params: {
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_RAPIDAPI_HOST,
      },
      data: {
        language_id: parseInt(selectedLanguage.id),
        source_code: btoa(code),
        stdin: btoa(""),
      },
    };
    try {
      const response = await axios.request(options);
      CheckStatus(response.data.token);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="io" style={{backgroundColor}}>
      <div className="input">
        Input
        <textarea placeholder="Enter input" className="input-box" type="text" />
      </div>
      <div className="output">
        Output
        <pre className="output-box"></pre>
      </div>
      <button className="run-btn" onClick={compile}>
        <img className="runimg" src={runimg} />
        <div className="run-btn-text">Run</div>
      </button>
      <div className="status">Status: </div>
      <div className="time">Time: </div>
      <div className="memory">Memory: </div>
    </div>
  );
}

export default IO;
