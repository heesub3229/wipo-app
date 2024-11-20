import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Login from "./pages/accounts/Login";
import Signup from "./pages/accounts/Signup";
import FindId from "./pages/accounts/FindId";
import FindPw from "./pages/accounts/FindPw";
import ResetPw from "./pages/accounts/ResetPw";
import FirstLogin from "./pages/accounts/FirstLogin";
import { KakaoLogin } from "./components/LoginIng";
import { Provider } from "react-redux";
import store from "./slices/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/FindId" element={<FindId />} />
          <Route path="/FindPW" element={<FindPw />} />
          <Route path="/ResetPW" element={<ResetPw />} />
          <Route path="/FirstLogin" element={<FirstLogin />} />
          <Route path="/Kakao" element={<KakaoLogin />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
