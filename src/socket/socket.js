const { Server } = require("socket.io");
let io;

const onlineUsers = new Map();

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("userConnected", (userId) => {
      onlineUsers.set(userId, socket.id);
    });

    socket.on("disconnect", () => {
      for (const [userId, sockId] of onlineUsers.entries()) {
        if (sockId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
    });
  });
}

function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
}

module.exports = {
  initSocket,
  getIO,
  onlineUsers,
};
