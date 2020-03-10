import React, { useState } from "react";
import io from "socket.io-client";
import Slider from "@material-ui/core/Slider";

const endpoint = "http://localhost:3005/";
const socket = io(endpoint);

const Home = () => {
  const [number, setNumber] = useState(0);

  const handleSliderChange = (event, newNumber) => {
    setNumber(newNumber);
    event.preventDefault();
    socket.emit("outgoing", number);
  };

  return (
    <div>
      <label>
        Testing:
        <Slider
          defaultValue={0}
          valueLabelDisplay="auto"
          step={0.1}
          marks
          min={0}
          max={1}
          onChange={handleSliderChange}
        />
      </label>
    </div>
  );
};

export default Home;
