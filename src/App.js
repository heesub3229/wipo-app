import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/accounts/Login";
import Signup from "./pages/accounts/Signup";
import FindId from "./pages/accounts/FindId";
import FindPw from "./pages/accounts/FindPw";
import ResetPw from "./pages/accounts/ResetPw";
import FirstLogin from "./pages/accounts/FirstLogin";
import { KakaoLogin, GoogleLogin } from "./components/LoginIng";
import { Provider } from "react-redux";
import store from "./slices/store";
import Main from "./pages/main/Main";
import { Error, Loading } from "./components/Common";
import WritePost from "./pages/post/WritePost";
import { PutStream } from "./api/UserApi";
import LedgerMain from "./pages/ledger/LedgerMain";

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
          <Route path="/WritePost" element={<WritePost />} />
          <Route path="/Kakao" element={<KakaoLogin />} />
          <Route path="/google" element={<GoogleLogin />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/Ledger" element={<LedgerMain />} />
        </Routes>
        <PutStream />
        <Loading />
        <Error />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
