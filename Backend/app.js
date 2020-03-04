const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const cors = require("cors");
const port = 3005;

app.use(cors());

app.get("/", (req, res) => {
  res.send("I am alive").status(200);
});

io.on("connection", socket => {
  console.log("connected");
  socket.on("outgoing", data => {
    io.emit("three", data);
    // console.log(data);
  });

  socket.on("disconnect", () => console.log("disconnected"));
});

server.listen(port, () => console.log(`listening on port ${port}!`));
