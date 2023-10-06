import React, {useState} from "react";
import Navbar from "../components/navbar";
import CodeEditor from "../components/Code-Editor";
import IO from "../components/IO";
function Nest() {
  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState({
    language: "javascript",
    id: "63",
  });
  return (
    <div>
      <Navbar backgroundColor={"#303030"} />
      <div className="bigbox">
        <CodeEditor
          code={code}
          setCode={setCode}
          selectedLanguage={selectedLanguage.language}
          setSelectedLanguage={setSelectedLanguage}
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
