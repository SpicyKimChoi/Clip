import React from "react";
import styled from "styled-components";
import LoginButton from "../../../components/atoms/LoginButton";
import LoginGoogle from "../../../components/atoms/LoginGoogle";
import ClipAddButton from "../../../components/atoms/ClipAddButton";
const PrivateClip = () => {
  return (
    <PrivateClipGrid>
      <LoginButton />
      PrivateClip
      <LoginGoogle />
      <ClipAddButton />
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
