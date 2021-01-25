import React from "react";
import styled from "styled-components";
import LoginGoogle from "../../atoms/LoginGoogle";
import LogoutButton from "../../atoms/LogoutButton";

const Header = () => {
  return (
    <div>
      <LoginGoogle />
      <LogoutButton />
    </div>
  );
};

export default Header;
