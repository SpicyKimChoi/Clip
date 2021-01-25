import React from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import * as dotenv from "dotenv";
import useLogin from "../../hooks/useLogin";
dotenv.config();

const LoginGoogle = () => {
  const { onLogin } = useLogin();
  const responseGoogle = (res: any): void => {
    console.log(res);
    onLogin();
  };
  const responseFailGoogle = (err: any): void => {
    console.log(err);
  };
  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENTID!}
        buttonText="Google login"
        onSuccess={responseGoogle}
        onFailure={responseFailGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
};

export default LoginGoogle;
