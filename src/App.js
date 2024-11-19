import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/accounts/Login";
import Signup from "./pages/accounts/Signup";
import FindId from "./pages/accounts/FindId";
import FindPw from "./pages/accounts/FindPw";
import ResetPw from "./pages/accounts/ResetPw";
import Main from "./pages/main/Main";
import FirstLogin from "./pages/accounts/FirstLogin";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/FindId" element={<FindId />} />
          <Route path="/FindPW" element={<FindPw />} />
          <Route path="/ResetPW" element={<ResetPw />} />
          <Route path="/FirstLogin" element={<FirstLogin />} />
          <Route path="/Main" element={<Main />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
