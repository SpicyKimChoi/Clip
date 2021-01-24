import React from "react";
import useLogin from "../../hooks/useLogin";

const LoginButton = () => {
  const { isLogin, onLogin, onLogout } = useLogin();
  return (
    <>
      <h1>{`${isLogin}`}</h1>
      <button onClick={onLogin}>Login</button>
      <button onClick={onLogout}>Logout</button>
    </>
  );
};

export default LoginButton;
