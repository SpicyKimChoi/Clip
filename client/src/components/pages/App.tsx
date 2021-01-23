import React from 'react';
import styled from 'styled-components';
import GlobalStlyes from "../GlobalStyle"
import Header from "../templates/top/Header"
import Combine from "../templates/Combine";

function App() {
  return (
    <Page>
      <GlobalStlyes />
      <Header />
      <Combine />
    </Page>
  );
}

const Page = styled.div`
  display: grid;
  border: 5px solid;
  border-color: black;
  grid-template-rows: 10vh 90vh;
  margin: 0px;
  grid-gap: 10px;
`
export default App;

