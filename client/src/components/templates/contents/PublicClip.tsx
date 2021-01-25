import React from "react";
import styled from "styled-components";

const PublicClip = () => {
  return <PublicClipGrid>PublicClip</PublicClipGrid>;
};

const PublicClipGrid = styled.div`
  grid-column: 2;
  grid-row: 1;
  border: 1px solid;
  border-color: blue;
`;

export default PublicClip;
