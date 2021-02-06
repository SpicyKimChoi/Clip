import React from "react";
import styled from "styled-components";
import PrivateClip from "./contents/PrivateClip";
import PublicClip from "./contents/PublicClip";
import Inbox from "./contents/Inbox";
import KanbanBoard from "./contents/KanbanBoard";

const Combine = () => {
  return (
    <CombineStyle>
      <PrivateClip />
      <PublicClip />
      <BottomContainer>
        <Inbox />
        <KanbanBoard />
      </BottomContainer>
    </CombineStyle>
  );
};

const CombineStyle = styled.div`
  height: 90vh;
  border: 5px solid;
  border-color: aqua;
`;

const BottomContainer = styled.div`
  display: flex;
`

export default Combine;
