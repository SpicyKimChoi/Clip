import React from "react";
import styled from "styled-components";
import LoginButton from "../../../components/atoms/LoginButton";
import LoginGoogle from "../../../components/atoms/LoginGoogle";
const PrivateClip = () => {
  return (
    <PrivateClipGrid>
      <LoginButton />
      PrivateClip
      <LoginGoogle />
    </PrivateClipGrid>
  );
};

const PrivateClipGrid = styled.div`
  grid-column: 1;
  grid-row: 1;
  border: 1px solid;
  border-color: red;
`;

export default PrivateClip;
