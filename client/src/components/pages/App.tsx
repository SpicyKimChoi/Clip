import React from 'react';
import styled from 'styled-components';
import PrivateClip from "../templates/PrivateClip"
import GlobalStlyes from "../GlobalStyle"
import PublicClip from '../templates/PublicClip';
import Inbox from '../templates/Inbox';
import KanbanBoard from '../templates/KanbanBoard';

function App() {
  return (
    <Page>
      <GlobalStlyes />
      <PrivateClip />
      <PublicClip />
      <Inbox />
      <KanbanBoard />
    </Page>
  );
}


const Page = styled.div`
  display: grid;
  border: 5px solid;
  border-color: black;
  grid-template-columns: 4fr 6fr;
  grid-template-rows: 30vh 70vh;
  margin: 0px;
  grid-gap: 10px;
`

export default App;

