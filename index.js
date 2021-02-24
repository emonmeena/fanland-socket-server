const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  let chatRoomId = "";
  socket.on("user-active", (activeUser) => {
    chatRoomId = activeUser.chatRoomId;
    socket.join(chatRoomId);
    socket.broadcast.to(chatRoomId).emit("user-online", activeUser);
  });

  socket.on("chat-message", (chat) => {
    socket.broadcast.to(chatRoomId).emit("receive-message", chat);
  });
  socket.on("disconnect", () => {});
});

http.listen(4000, () => {});
