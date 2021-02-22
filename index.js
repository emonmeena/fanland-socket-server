const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  // socket.on("new-user-joined", (userName) => {
  //   users[socket.id] = userName;
  //   socket.broadcast.emit("user-joined", userName);
  // });

  // socket.on("send", (message) => {
  //   socket.broadcast.emit("receive", {
  //     message: message,
  //     userName: users[socket.id],
  //   });
  // });
  // socket.on("disconnect", (message) => {
  //   socket.broadcast.emit("leave", {
  //     message: message,
  //     userName: users[socket.id],
  //   });
  //   delete users[socket.id];
  // });
  let chatRoomId = "";
  socket.on("user-active", (activeUser) => {
    chatRoomId = activeUser.chatRoomId;
    // console.log(chatRoomId);
    socket.join(chatRoomId);
    socket.broadcast.to(chatRoomId).emit("user-online", activeUser);
  });

  socket.on("chat-message", (chat) => {
    // console.log(chatRoomId);
    socket.broadcast.to(chatRoomId).emit("receive-message", chat);
  });
  socket.on("disconnect", () => {
    // console.log("user disconnected");
  });
});

http.listen(4000, () => {
  // console.log("listeniing on port  4000");
});
