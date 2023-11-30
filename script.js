document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("game-board");
    const message = document.getElementById("message");
    const turnMessage = document.getElementById("turn-message"); // Added this line
    const resetButton = document.getElementById("reset-button");
    const cells = [];

    let currentPlayer = "X";
    let gameOver = false;

    // Create the game board cells
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("game-cell");
        cell.dataset.index = i;
        cells.push(cell);
        cell.addEventListener("click", () => cellClick(i));
        gameBoard.appendChild(cell);
    }

    // Function to handle cell clicks
    function cellClick(index) {
        if (!cells[index].textContent && !gameOver) {
            cells[index].textContent = currentPlayer;
            checkWinner();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateTurnMessage(); // Added this line
        }
    }

    // Function to check for a winner
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (
                cells[a].textContent &&
                cells[a].textContent === cells[b].textContent &&
                cells[a].textContent === cells[c].textContent
            ) {
                message.textContent = `${currentPlayer} wins!`;
                gameOver = true;
                return;
            }
        }

        if ([...cells].every((cell) => cell.textContent)) {
            message.textContent = "It's a draw!";
            gameOver = true;
        }
    }

    // Function to update turn message
    function updateTurnMessage() {
        turnMessage.textContent = `Player ${currentPlayer}'s Turn`;
    }

    // Reset the game
    resetButton.addEventListener("click", () => {
        cells.forEach((cell) => {
            cell.textContent = "";
        });
        message.textContent = "";
        currentPlayer = "X";
        gameOver = false;
        updateTurnMessage(); // Added this line
    });
});
