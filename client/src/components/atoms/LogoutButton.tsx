import React from "react";
import useLogin from "../../hooks/useLogin";

const LogoutButton = () => {
  const { isLogin, onLogout } = useLogin();
  return (
    <>
      <>{`${isLogin}`}</> {/* 지울 것 */}
      <button onClick={() => onLogout()}>Logout</button>
    </>
  );
};

export default LogoutButton;
