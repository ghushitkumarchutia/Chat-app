require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./src/config/db");
const chatRoutes = require("./src/routes/chat.routes");
const errorMiddleware = require("./src/middlewares/error.middleware");
const { initSocket } = require("./src/socket/socket");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/chat", chatRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Chat API is running");
});

// Error handling middleware
app.use(errorMiddleware);

// Connect to DB and start server
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  initSocket(server);
});
