import React, { useState } from "react";
import io from "socket.io-client";

const Home = () => {
  const endpoint = "http://localhost:3005/";
  const [text, setText] = useState("");

  const handleChange = event => {
    setText(event.target.value);
  };

  const sendData = () => {
    const socket = io(endpoint);
    socket.emit("outgoing", { data: text });
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
