import "./App.css";
import Nest from "./pages/Nest";
import Landing from "./pages/Landing";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Nest" element={<Nest />}></Route>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/createaccount" element={<CreateAccount />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
