import React, {useState, useEffect} from "react";
import Editor from "@monaco-editor/react";
import {loader} from "@monaco-editor/react";
import {allthemes} from "../utils/getThemes";
import {languageOptions} from "../utils/languages";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function CodeEditor({
  code,
  setCode,
  selectedLanguage,
  setSelectedLanguage,
  savebtn,
  setsavebtn,
  filename,
}) {
  const [selectedTheme, setSelectedTheme] = useState("vs-dark");
  const navigate = useNavigate();
  useEffect(() => {
    for (let key in allthemes) {
      loader.init().then((monaco) => {
        import(
          `../../node_modules/monaco-themes/themes/${allthemes[key]}.json`
        ).then((data) => {
          monaco.editor.defineTheme(key, data);
        });
      });
    }
    if (filename) {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        "Content-Type": "application/json",
      };
      const fetchOptions = {
        method: "GET",
        headers: headers,
      };
      setTimeout(() => {
        fetch(`${process.env.REACT_APP_FILES_LINK}/${filename}`, fetchOptions)
          .then((response) => {
            if (!response.ok) {
              console.log(response);
            } else {
              return response.json();
            }
          })
          .then((data) => {
            setCode(atob(data.code));
            setSelectedTheme(data.theme);
            const foundOption = languageOptions.find(
              (option) => option.value === data.language
            );
            setSelectedLanguage({language: data.language, id: foundOption.id});
          })
          .catch((err) => {});
      }, 500);
    }
  }, []);
  const handleThemeChange = (event) => {
    const newTheme = event.target.value;
    setSelectedTheme(newTheme);
  };
  const handleLanguageChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const optionKey = selectedOption.getAttribute("id");
    const newLanguage = {language: event.target.value, id: optionKey};
    setSelectedLanguage(newLanguage);
    console.log(selectedLanguage);
  };
  let handleUpdate = async (language) => {
    const date = new Date();
    const data = {
      file_name: filename,
      code: btoa(code),
      theme: selectedTheme,
      language: language,
      last_edited: `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
      "Content-Type": "application/json",
    };
    const fetchOptions = {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(data),
    };
    const response = await fetch(
      `${process.env.REACT_APP_FILES_LINK}/${filename}`,
      fetchOptions
    );
    if (response.ok) {
      toast("File saved", {
        icon: "✅",
        autoClose: 1000,
        position: "top-center",
        style: {
          borderRadius: "5px",
          background: "#333131",
          color: "whitesmoke",
        },
      });
    } else {
      toast("Sorry but you can't save this file", {
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
  };
  return (
    <div>
      <select
        id="languages"
        value={selectedLanguage}
        onChange={handleLanguageChange}>
        {languageOptions.map((option) => (
          <option id={option.id} key={option.id} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      <select id="themes" value={selectedTheme} onChange={handleThemeChange}>
        <option id="vs-dark" value="vs-dark">
          Dark
        </option>
        {Object.entries(allthemes).map(([themeKey, themeName]) => (
          <option key={themeKey} value={themeKey}>
            {themeName}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          handleUpdate(selectedLanguage);
        }}
        className="save-btn"
        style={savebtn ? {} : {display: "none"}}>
        Save
      </button>
      <div
        className="code-editor-box"
        value={selectedLanguage}
        onChange={handleLanguageChange}>
        <Editor
          language={selectedLanguage}
          value={code}
          theme={selectedTheme}
          onChange={(newCode) => setCode(newCode)}
        />
      </div>
    </div>
  );
}

export default CodeEditor;
