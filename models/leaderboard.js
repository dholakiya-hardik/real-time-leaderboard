
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

  
// Define the leaderboard schema
const LeaderboardSchema = new mongoose.Schema({
  player: { type: String, required: true, unique: true },
  score: { type: Number, required: true },
});

module.exports = mongoose.model('Leaderboard', LeaderboardSchema);
