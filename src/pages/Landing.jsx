import React, {useEffect} from "react";
import Navbar from "../components/navbar";
import compiler from "../assets/compilerf.gif";
import compiler2 from "../assets/compile-2.gif";
import javascript from "../assets/javascript.png";
import python from "../assets/python.png";
import cpp from "../assets/c++.png";
import typescript from "../assets/typescript.png";
import instagram from "../assets/instagram.png";
import linkedin from "../assets/linkedin.png";
import github from "../assets/github.png";
import coding from "../assets/planetrevolving3.gif";
import {Link} from "react-router-dom";
import files from "../assets/files.png";

import "react-toastify/dist/ReactToastify.css";
function Landing() {
  sessionStorage.removeItem("data");
  return (
    <div>
      <Navbar backgroundColor="black" />
      <div className="bigbox">
        <main>
          <section className="landing-1">
            <div className="welcome-container">
              <h3 className="welcome-text">
                Welcome <br />
                to DevNest
              </h3>
              <div className="welcome-passage">
                a web-based coding compiler to code in various languages without
                the need for IDE downloads.
              </div>
              <Link to="/nest">
                <button className="code-btn">Try it!</button>
              </Link>
              <img className="code-editor-gif" src={compiler} />
            </div>
          </section>
          <section className="landing-2">
            <div className="feature-container">
              <div className="line-1"></div>
              <h3 className="Feature-text">What else do you get?</h3>
              <ul className="Feature-list">
                <li>Supports 40+ Programming languages</li>
                <li>Supports 50+ Themes</li>
                <li>Lets you code in the browser itself</li>
                <li>Supports autocomplete in many programming languages.</li>
                <li>Lets you save your programming files in your account.</li>
              </ul>
              <img className="compile-2" src={compiler2} />
              <img src={files} className="files-png" />
              <div className="lang-images">
                <img className="python" src={python} />
                <img className="cpp" src={cpp} />
                <img className="typescript" src={typescript} />
                <img className="javascript" src={javascript} />
              </div>
            </div>
          </section>
          <section className="landing-3">
            <div className="connection-section">
              <h1 className="connection-text">Connect with me:</h1>
              <div className="end-note">
                Connect with me through social media platforms, <br />
                and feel free to raise any issues on GitHub as well.
              </div>
              <div className="social-images">
                <Link to="https://github.com/mrdetective">
                  <img className="github" src={github} />
                </Link>
                <Link to="https://www.linkedin.com/in/harsha-gupta-397314136/">
                  <img className="linkedin" src={linkedin} />
                </Link>
                <Link to="https://www.instagram.com/hrsha.___/">
                  <img className="instagram" src={instagram} />
                </Link>
              </div>
              <img className="coding-img" src={coding}></img>
            </div>
            <footer>
              Powered by:{" "}
              <Link
                className="footer-link"
                to="https://microsoft.github.io/monaco-editor/">
                Monaco
              </Link>{" "}
              and{" "}
              <Link className="footer-link" to="https://judge0.com/">
                Judge0
              </Link>
            </footer>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Landing;
