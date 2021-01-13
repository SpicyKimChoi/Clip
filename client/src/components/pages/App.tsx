import React from 'react';
import styled from 'styled-components';
import PrivateLink from "../templates/PrivateLink"
import GlobalStlyes from "../GlobalStyle"

function App() {
  return (
    <Page>
      <GlobalStlyes />
      <PrivateLink />
    </Page>
  );
}


const Page = styled.div`
  display: grid;
  border: 5px solid;
  border-color: black;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 30vh 70vh;
  margin: 0px;
  grid-gap: 10px;
`

export default App;

