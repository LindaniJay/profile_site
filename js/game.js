const emojis = ['🍕','🚀','🎸','🐱','🌈','⚡','🎮','🦄'];
let cards = [];
let flipped = [];
let matched = [];
let moves = 0;
let matches = 0;

const board = document.getElementById('gameBoard');
const movesEl = document.getElementById('gameMoves');
const matchesEl = document.getElementById('gameMatches');
const restartBtn = document.getElementById('gameRestart');
const restartBtn2 = document.getElementById('gameRestart2');
const winMsg = document.getElementById('gameWinMsg');

function shuffle(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function createBoard() {
  board.innerHTML = '';
  cards = shuffle([...emojis, ...emojis]);
  flipped = [];
  matched = [];
  moves = 0;
  matches = 0;
  movesEl.textContent = moves;
  matchesEl.textContent = matches;
  winMsg.style.display = 'none';
  cards.forEach((emoji, idx) => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back">${emoji}</div>
      </div>
    `;
    card.addEventListener('click', () => flipCard(card, idx));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') flipCard(card, idx); });
    board.appendChild(card);
  });
}

function flipCard(card, idx) {
  if (flipped.length === 2 || card.classList.contains('flipped') || matched.includes(idx)) return;
  card.classList.add('flipped');
  flipped.push({ idx, card });
  if (flipped.length === 2) {
    moves++;
    movesEl.textContent = moves;
    const [a, b] = flipped;
    if (cards[a.idx] === cards[b.idx]) {
      matched.push(a.idx, b.idx);
      matches++;
      matchesEl.textContent = matches;
      flipped = [];
      if (matched.length === cards.length) {
        setTimeout(() => { winMsg.style.display = 'block'; }, 600);
      }
    } else {
      setTimeout(() => {
        a.card.classList.remove('flipped');
        b.card.classList.remove('flipped');
        flipped = [];
      }, 900);
    }
  }
}

function restartGame() {
  createBoard();
}

restartBtn.addEventListener('click', restartGame);
if (restartBtn2) restartBtn2.addEventListener('click', restartGame);

createBoard(); 