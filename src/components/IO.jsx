import React, {useState} from "react";
import runimg from "../assets/run.png";

function IO({backgroundColor, code, selectedLanguage}) {
  const [loading, setloading] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");
  const [time, setTime] = useState("");
  const [memory, setMemory] = useState("");

  const CompileCode = async () => {
    setloading(true);
    if (code === "") {
      setloading(false);
      return;
    }
    const formdata = {
      language_id: parseInt(selectedLanguage.id),
      source_code: btoa(code),
      stdin: btoa(input),
    };
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formdata),
    };
    try {
      const response = await fetch(process.env.REACT_APP_COMPILE_LINK, options);
      const data = await response.json();
      setOutput(atob(data.stdout));
      setStatus(data.status);
      setTime(data.time);
      setMemory(data.memory);
      setloading(false);
    } catch (error) {
      console.log(error);
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
      <button className="run-btn" onClick={CompileCode}>
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
      <div className="status">Status: {status}</div>
      <div className="time">Time: {time}</div>
      <div className="memory">Memory: {memory}</div>
    </div>
  );
}

export default IO;
