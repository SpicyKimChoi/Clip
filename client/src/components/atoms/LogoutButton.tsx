import React from "react";
import useLogin from "../../hooks/useLogin";

const LogoutButton = () => {
  const { isLogin, onLogout } = useLogin();
  return (
    <>
      <div>{`${isLogin}`}</div>
      <button onClick={onLogout}>Logout</button>
    </>
  );
};

export default LogoutButton;
