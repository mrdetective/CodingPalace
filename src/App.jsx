import "./App.css";
import Nest from "./pages/Nest";
import Landing from "./pages/Landing";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Dashboard from "./pages/dashboard";
import {ToastContainer} from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/Nest" element={<Nest />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/createaccount" element={<CreateAccount />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
