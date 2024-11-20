import axios from "axios";
import { useEffect } from "react";
import { Lodaing } from "./Common";

export const KakaoLogin = () => {
  const serverUrl = process.env.REACT_APP_SERVER_API;

  const code = new URL(window.location.href).searchParams.get("code");
  useEffect(() => {
    const kakaoAuth = async () => {
      const response = await axios.get(
        `${serverUrl}/user/kakaoLogin?code=${code}`
      );

      const res = await response.data;
      if (res) {
        if (res.errFlag === true) {
          return <div>로그인에러</div>;
        } else {
          if (res.data) {
            dispatch(setToken(res.data));
            navigate("/Main");
          }
        }
      } else {
        navigate("/");
      }
    };

    kakaoAuth();
  }, []);

  return (
    <>
      <Lodaing />
    </>
  );
};
