const { Server } = require("socket.io");
let io;

function setupWebSocket(server) {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log(`🔌 ESP connected: ${socket.id}`);

    socket.on("esp-join", (espId) => {
      socket.join(espId);
      console.log(`ESP ${espId} joined room`);
    });

    socket.on("disconnect", () => {
      console.log("ESP disconnected:", socket.id);
    });
  });
}

module.exports = {
  setupWebSocket,
  get io() {
    return io;
  },
};
