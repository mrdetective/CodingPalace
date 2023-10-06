import React, {useState} from "react";
import runimg from "../assets/run.png";
import axios from "axios";

function IO({backgroundColor, code, selectedLanguage}) {
  const [loading, setloading] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const CheckStatus = async (token) => {
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
      setOutput(atob(response.data.stdout));
      setloading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const compile = async () => {
    setloading(true);
    const formdata = {
      language_id: parseInt(selectedLanguage.id),
      source_code: btoa(code),
      stdin: btoa(input),
    };
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
      data: formdata,
    };
    try {
      const response = await axios.request(options);
      CheckStatus(response.data.token);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="io" style={{backgroundColor}}>
      <div className="input">
        Input
        <textarea
          placeholder="Enter input"
          className="input-box"
          type="text"
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className="output">
        Output
        <pre className="output-box">{output}</pre>
      </div>
      <button className="run-btn" onClick={compile}>
        <img
          className="runimg"
          src={runimg}
          style={{display: loading ? "none" : ""}}
        />
        <div className="lds-ring" style={{display: !loading ? "none" : ""}}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="run-btn-text">Run</div>
      </button>
      <div className="status">Status: </div>
      <div className="time">Time: </div>
      <div className="memory">Memory: </div>
    </div>
  );
}

export default IO;
