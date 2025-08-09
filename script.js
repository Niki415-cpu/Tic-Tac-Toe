const board = document.getElementById('board');
const statusText = document.getElementById('status');
let currentPlayer = 'X';
let gameActive = true;
let cells = [];

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function createBoard() {
  board.innerHTML = '';
  cells = [];

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
    cells.push(cell);
  }

  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function handleCellClick(e) {
  const cell = e.target;
  const index = parseInt(cell.dataset.index);

  if (!gameActive || cell.textContent !== '') return;

  cell.textContent = currentPlayer;
  cell.classList.add('disabled');

  if (checkWin(currentPlayer)) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    highlightWinningCells(currentPlayer);
    gameActive = false;
    return;
  }

  if (isDraw()) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => cells[index].textContent === player);
  });
}

function highlightWinningCells(player) {
  winningCombinations.forEach(combination => {
    if (combination.every(index => cells[index].textContent === player)) {
      combination.forEach(index => {
        cells[index].classList.add('winner');
      });
    }
  });
}

function isDraw() {
  return cells.every(cell => cell.textContent !== '');
}

function restartGame() {
  createBoard();
}

// Initialize board on page load
createBoard();
