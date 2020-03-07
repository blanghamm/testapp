import React from "react";
import Home from "./components/Home";
import Box from "./components/Three";
import styled from "styled-components";

const BigBox = styled(Box)`
  position: absolute !important;
`;

function App() {
  return (
    <div className="App">
      <Home />
      <BigBox />
    </div>
  );
}

export default App;
