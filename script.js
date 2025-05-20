// --- FONT LOADER (Dynamically inject Google Font) ---
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

// --- SET FONT GLOBALLY ---
document.body.style.fontFamily = "'Luckiest Guy', cursive";

// --- BRAWLER CARD HOVER ANIMATION ---
document.querySelectorAll('.brawler-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.classList.add('hovered');
    playSound('hover');
  });
  card.addEventListener('mouseleave', () => {
    card.classList.remove('hovered');
  });
});

// --- BACKGROUND MUSIC CONTROL ---
const bgMusic = document.getElementById('bg-music');
const musicButton = document.getElementById('music-toggle');

musicButton.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicButton.textContent = 'Pause Music 🎵';
    playSound('click');
  } else {
    bgMusic.pause();
    musicButton.textContent = 'Play Music 🎶';
    playSound('click');
  }
});

// --- DARK MODE TOGGLE ---
const darkButton = document.getElementById('dark-mode-toggle');

darkButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  darkButton.textContent = document.body.classList.contains('dark-mode')
    ? 'Switch to Light Mode ☀️'
    : 'Switch to Dark Mode 🌙';
  playSound('click');
});

// --- RANDOM QUOTE FEATURE ---
const quoteButton = document.getElementById('quote-button');
const quoteDisplay = document.getElementById('quote-display');

const quotes = [
  '"Time to move to the boombox groove!"',
  '"Oh, you got rekt!"',
  '"Brawl Stars forever!"',
  '"I’m gonna wreck ya!"',
  '"Flower power!"',
  '"Brawn and beauty!"',
  '"Don’t mess with the Jess!"',
  '"I’m sugar and spice!"',
  '"Yo soy el mejor!"'
];

quoteButton.addEventListener('click', () => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteDisplay.textContent = randomQuote;
  quoteDisplay.classList.add('pop');
  setTimeout(() => quoteDisplay.classList.remove('pop'), 500);
  playSound('click');
});

// --- SOUND EFFECTS ---
function playSound(type) {
  let sound = new Audio();
  if (type === 'click') {
    sound.src = 'sounds/click.mp3'; // Make sure this file exists
  } else if (type === 'hover') {
    sound.src = 'sounds/hover.mp3'; // Optional hover sound
  }
  sound.volume = 0.3;
  sound.play();
}
