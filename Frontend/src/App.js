import React from "react";
import Home from "./components/Home";
import Box from "./components/Three";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";

const BigBox = styled(Box)`
  position: absolute !important;
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vh;
`;

const Main = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ecede7;
`;

function App() {
  return (
    <Main>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/three" component={BigBox}></Route>
      </Switch>
    </Main>
  );
}

export default App;
