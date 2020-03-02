const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const cors = require("cors");
const port = 3005;

app.use(cors());

app.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

io.on("connection", socket => {
  const res = "hello mate";
  console.log("connected");
  socket.on("disconnect", () => console.log("disconnected"));
  socket.emit("connectionAPI", res);
});

server.listen(port, () => console.log(`listening on port ${port}!`));
