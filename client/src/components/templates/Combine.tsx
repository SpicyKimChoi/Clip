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
      <Inbox />
      <KanbanBoard />
    </CombineStyle>
  );
};

const CombineStyle = styled.div`
  display: grid;
  border: 5px solid;
  border-color: black;
  grid-template-columns: 4fr 6fr;
  grid-template-rows: 20vh 70vh;
  margin: 0px;
  grid-gap: 10px;
`;

export default Combine;
