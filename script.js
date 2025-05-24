let players = [];
let currentPlayerIndex = 0;
let currentCombo = "";
let timer;
let timeLeft = 10;

// Lobby logic
function joinLobby() {
  const nameInput = document.getElementById("playerName");
  const name = nameInput.value.trim();

  if (!name || players.find(p => p.name === name)) return;

  players.push({ name, eliminated: false });
  updateLobbyUI();
  nameInput.value = "";

  if (players.length >= 2) {
    document.getElementById("startBtn").disabled = false;
  }
}

function updateLobbyUI() {
  const list = document.getElementById("playerList");
  list.innerHTML = "";
  players.forEach(player => {
    const li = document.createElement("li");
    li.textContent = player.name;
    list.appendChild(li);
  });
}

function startGame() {
  document.getElementById("lobby").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  nextTurn();
}

// Game logic
function nextTurn() {
  if (players.filter(p => !p.eliminated).length === 1) {
    endGame();
    return;
  }

  do {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  } while (players[currentPlayerIndex].eliminated);

  document.getElementById("status").textContent =
    `${players[currentPlayerIndex].name}'s turn`;

  currentCombo = randomLetterPair();
  document.getElementById("letterCombo").textContent =
    `Use: "${currentCombo}"`;

  document.getElementById("wordInput").value = "";
  document.getElementById("wordInput").focus();

  timeLeft = 10;
  updateTimerUI();
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    updateTimerUI();
    if (timeLeft <= 0) {
      eliminatePlayer();
    }
  }, 1000);
}

function updateTimerUI() {
  document.getElementById("timer").textContent = `Time: ${timeLeft}`;
}

function submitWord() {
  const word = document.getElementById("wordInput").value.trim().toLowerCase();
  if (!word.includes(currentCombo)) {
    eliminatePlayer();
    return;
  }
  clearInterval(timer);
  nextTurn();
}

function eliminatePlayer() {
  clearInterval(timer);
  players[currentPlayerIndex].eliminated = true;
  alert(`${players[currentPlayerIndex].name} is eliminated!`);
  nextTurn();
}

function endGame() {
  const winner = players.find(p => !p.eliminated);
  document.getElementById("game").classList.add("hidden");
  document.getElementById("gameOver").classList.remove("hidden");
  document.getElementById("winner").textContent = `${winner.name} wins!`;
}

// Utility
function randomLetterPair() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const a = letters[Math.floor(Math.random() * letters.length)];
  const b = letters[Math.floor(Math.random() * letters.length)];
  return a + b;
}
