//Node server for handling socket
const { Server } = require("socket.io");

const io = new Server(4000, {
  cors: {
    origin: `http://127.0.0.1:5500`,
  },
});

console.log("Hello");

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    console.log(`New User ${name} has joined`);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });

  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", { name: users[socket.id] });
    delete users[socket.id];
  });
});
