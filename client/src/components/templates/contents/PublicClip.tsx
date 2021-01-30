import React from "react";
import styled from "styled-components";

const PublicClip = () => {
  return (
    <PublicClipGrid style={{ overflow: 'scroll' }}>
      PublicClip
    </PublicClipGrid>
  );
};

const PublicClipGrid = styled.section`
  grid-column: 2;
  grid-row: 1;
  border: 1px solid;
  border-color: blue;
`;

export default PublicClip;
