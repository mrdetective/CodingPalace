import React from "react";
import Navbar from "../components/navbar";
import compiler from "../assets/compiler.gif";
import compiler2 from "../assets/compile-2.gif";
import javascript from "../assets/javascript.png";
import python from "../assets/python.png";
import cpp from "../assets/c++.png";
import typescript from "../assets/typescript.png";
function Landing() {
  return (
    <div className="bigbox">
      <Navbar backgroundColor="transperant" />
      <main>
        <section className="landing-1">
          <div className="welcome-container">
            <h3 className="welcome-text">
              Welcome <br />
              to CodingPalace
            </h3>
            <div className="welcome-passage">
              a web-based coding compiler to code in various languages without
              the need for IDE downloads.
            </div>
            <button className="code-btn">Try it!</button>
            <img className="code-editor-gif" src={compiler} />
          </div>
        </section>
        <section className="landing-2">
          <div className="feature-container">
            <div className="line-1"></div>
            <h3 className="Feature-text">What else do you get?</h3>
            <ul className="Feature-list">
              <li>Supports 40+ Programing languages</li>
              <li>Supports 50+ Themes</li>
              <li>Let's you code in the browser itself</li>
              <li>Supports autocomplete in many programming languages.</li>
            </ul>
            <img className="compile-2" src={compiler2} />
            <div className="lang-images">
              <img className="python" src={python} />
              <img className="cpp" src={cpp} />
              <img className="typescript" src={typescript} />
              <img className="javascript" src={javascript} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Landing;
