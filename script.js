document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('gameContainer');
    const resultContainer = document.getElementById('resultContainer');
    const resultMessage = document.getElementById('resultMessage');
    const newGameButton = document.getElementById('newGameButton');
    const gameBoard = document.getElementById('gameBoard');
    const resetButton = document.getElementById('resetButton');
    let currentPlayer = 'X';
    let cells = [];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', cellClick);
            gameBoard.appendChild(cell);
            cells.push(cell);
        }
    }

    function resetGame() {
        currentPlayer = 'X';
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winner');
        });
        resultContainer.classList.add('hidden');
        gameContainer.classList.remove('hidden');
    }

    function cellClick() {
        if (!this.textContent) {
            this.textContent = currentPlayer;
            if (checkWinner()) {
                showResult(`${currentPlayer} wins!`);
                return;
            }
            if (checkDraw()) {
                showResult("It's a draw!");
                return;
            }
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWinner() {
        const winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const condition of winningConditions) {
            const [a, b, c] = condition;
            if (cells[a].textContent &&
                cells[a].textContent === cells[b].textContent &&
                cells[a].textContent === cells[c].textContent) {
                cells[a].classList.add('winner');
                cells[b].classList.add('winner');
                cells[c].classList.add('winner');
                return true;
            }
        }

        return false;
    }

    function checkDraw() {
        return cells.every(cell => cell.textContent);
    }

    function showResult(message) {
        resultMessage.textContent = message;
        resultContainer.classList.remove('hidden');
        gameContainer.classList.add('hidden');
    }

    resetButton.addEventListener('click', resetGame);

    newGameButton.addEventListener('click', resetGame);
});
