const dictionary = [
  "there", "other", "another", "react", "friend", "enemy", 
  "inside", "output", "trend", "clean", "throne", "return", "render", 
  "enter", "danger", "friend", "inbox", "attend", "owner"
];

let players = [];
let currentPlayerIndex = 0;
let currentCombo = "";
let timer;
let timeLeft = 10;

function getRandomCombo() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let combo = "";
  while (true) {
    combo = alphabet[Math.floor(Math.random() * alphabet.length)] +
            alphabet[Math.floor(Math.random() * alphabet.length)];
    if (combo.length === 2) break;
  }
  return combo;
}

function startGame() {
  const num = parseInt(document.getElementById("numPlayers").value);
  players = Array.from({ length: num }, (_, i) => ({ name: `Player ${i + 1}`, eliminated: false }));
  document.getElementById("setup").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  nextTurn();
}

function nextTurn() {
  if (players.filter(p => !p.eliminated).length === 1) {
    endGame();
    return;
  }

  do {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  } while (players[currentPlayerIndex].eliminated);

  document.getElementById("status").textContent = `${players[currentPlayerIndex].name}'s turn`;
  currentCombo = getRandomCombo();
  document.getElementById("letterCombo").textContent = `Use: "${currentCombo}"`;
  document.getElementById("wordInput").value = "";
  document.getElementById("wordInput").focus();

  timeLeft = 10;
  document.getElementById("timer").textContent = `Time: ${timeLeft}`;
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `Time: ${timeLeft}`;
    if (timeLeft <= 0) {
      eliminatePlayer();
    }
  }, 1000);
}

function submitWord() {
  const word = document.getElementById("wordInput").value.trim().toLowerCase();
  if (!word.includes(currentCombo) || !dictionary.includes(word)) {
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
