// Game Elements
const cells = document.querySelectorAll('.cell');
const statusMessage = document.getElementById('statusMessage');
const resetButton = document.getElementById('resetButton');

// Game State
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

// Winning Conditions
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

// Handle Cell Click
function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !isGameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    
    checkResult();
}

// Check Game Result
function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            highlightWinningCells([a, b, c]);
            break;
        }
    }

    if (roundWon) {
        isGameActive = false;
        statusMessage.textContent = `Player ${currentPlayer} Wins!`;
        setTimeout(() => {
            window.location.href = `winner.html?winner=${currentPlayer}`;
        }, 1500);
        return;
    }

    if (!board.includes('')) {
        statusMessage.textContent = "Game ended in a draw!";
        setTimeout(() => {
            window.location.href = "winner.html?winner=draw";
        }, 1500);
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
}

// Highlight Winning Cells
function highlightWinningCells(cells) {
    cells.forEach(index => {
        document.querySelector(`[data-index="${index}"]`).classList.add('winning-cell');
    });
}

// Reset Game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winning-cell');
    });
}

// Event Listeners
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

// Initialize Game
statusMessage.textContent = `Player ${currentPlayer}'s turn`;