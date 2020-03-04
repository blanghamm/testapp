import React from "react";
import Home from "./components/Home";
import Box from "./utils/Connect";
import styled from "styled-components";
import { Canvas as c } from "react-three-fiber";

const BigBox = styled(Box)`
  background-color: #cdcd;
  position: absolute !important;
  margin: 0;
  padding: 0;
`;

function App() {
  return (
    <div className="App">
      <Home />
      {/* <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas> */}
      <BigBox />
    </div>
  );
}

export default App;
