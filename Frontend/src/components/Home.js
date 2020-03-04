import React, { useState } from "react";
import io from "socket.io-client";

const endpoint = "http://localhost:3005/";
const socket = io(endpoint);

const Home = () => {
  const [text, setText] = useState(0);

  const handleChange = event => {
    setText(event.target.value);
  };

  const sendData = e => {
    e.preventDefault();
    socket.emit("outgoing", text);
    setText(0);
  };

  return (
    <div>
      <form onSubmit={sendData}>
        <label>
          Testing:
          <input type="text" value={text} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Home;
