require('dotenv').config()
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const Leaderboard = require('./models/leaderboard');

// Setup Express and HTTP server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

// Helper function to get the leaderboard
async function getLeaderboard() {
  return await Leaderboard.find().sort({ score: -1 });
}

io.on('connection', async (socket) => {
  console.log('Client connected:', socket.id);

  // Send the initial leaderboard
  const leaderboard = await getLeaderboard();
  socket.emit('leaderboard', leaderboard);

  // Handle score updates
  socket.on('updateScore', async ({ player }) => {
    const result = await Leaderboard.findOneAndUpdate(
      { player },
      { $inc: { score: 1 } },
      { upsert: true, new: true }
    );

    // Broadcast updated leaderboard
    const updatedLeaderboard = await getLeaderboard();
    io.emit('leaderboard', updatedLeaderboard);
  });

  socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
