import React, {useState, useEffect} from "react";
import Editor from "@monaco-editor/react";
import {loader} from "@monaco-editor/react";
import {allthemes} from "../utils/getThemes";
import {languageOptions} from "../utils/languages";

function CodeEditor({code, setCode, selectedLanguage, setSelectedLanguage}) {
  const [selectedTheme, setSelectedTheme] = useState("vs-dark");
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
  };
  return (
    <div>
      <select
        id="languages"
        value={selectedLanguage.language}
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
      <button className="save-btn">Save</button>
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
