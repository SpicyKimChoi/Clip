import React from "react";
import styled from "styled-components";

import ClipAddButton from "../../../components/atoms/ClipAddButton";

const PrivateClip = () => {
  return (
    <PrivateClipGrid style={{ overflow: "scroll" }}>
      <ClipAddButton />

    </PrivateClipGrid>
  );
};

const PrivateClipGrid = styled.section`
  grid-column: 1;
  grid-row: 1;
  border: 1px solid;
  border-color: red;
`;

export default PrivateClip;
