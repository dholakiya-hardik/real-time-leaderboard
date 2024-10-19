
// Connect to the backend Socket.IO server
const socket = io();

// Update the leaderboard on the page
socket.on('leaderboard', (leaderboard) => {
  const tbody = document.querySelector('#leaderboard tbody');
  tbody.innerHTML = ''; 

  leaderboard.forEach(({ player, score }) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${player}</td><td>${score}</td>`;
    tbody.appendChild(row);
  });
});

// Increase the score for the entered player
function increaseScore() {
  const playerName = document.getElementById('playerName').value.trim();
  if (playerName) {
    socket.emit('updateScore', { player: playerName.toUpperCase() });
  } else {
    alert('Please enter a player name.');
  }
}
