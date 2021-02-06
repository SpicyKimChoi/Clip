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
  display: flex;
  height: 100vh;
  -webkit-box-orient: vertical;
  flex-direction: column;
  border: 5px solid;
  border-color: orange;
  padding-bottom: 10rem;
`
export default App;

