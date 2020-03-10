import React, { useState } from "react";
import io from "socket.io-client";
import Slider from "@material-ui/core/Slider";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";

const endpoint = "http://localhost:3005/";
const socket = io(endpoint);

const Blob = styled(animated.div)`
  width: 80px;
  height: 80px;
  background: hotpink;
  border-radius: 16px;
`;

const Main = styled.div`
  height: 90%;
  width: 90%;
`;

function Simple() {
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }));
  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ down, movement: [mx, my] }) => {
    set({ x: down ? mx : 0, y: down ? my : 0 });
  });
  // Bind it to a component
  return <Blob {...bind()} style={{ x, y }} />;
}

const Home = () => {
  const [number, setNumber] = useState(0);

  const handleSliderChange = (event, newNumber) => {
    setNumber(newNumber);
    event.preventDefault();
    socket.emit("outgoing", number);
  };

  return (
    <Main>
      <label>
        Testing:
        <Slider
          orientation="vertical"
          defaultValue={0}
          valueLabelDisplay="auto"
          marks
          min={0}
          max={1}
          onChange={handleSliderChange}
        />
      </label>
      <Simple />
    </Main>
  );
};

export default Home;
