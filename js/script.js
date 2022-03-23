const statusDisplay = document.querySelector('.game-status');
const fields = document.querySelectorAll('.board > .field');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const resetButton = document.querySelector(".reset-button");
resetButton.addEventListener('click', handleRestartGame);

const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

for(let i = 0; i < fields.length; i++) {
    const field = fields[i];

    field.addEventListener('click', function() {
        handleCellClick(field, i);
    })
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusDisplay.innerHTML = currentPlayerTurn();
}
function handleCellClick(field, clickedNumber) {
    console.log("You have clicked " + clickedNumber);

    field.innerHTML = currentPlayer;
    handlePlayerChange()
}
function handleRestartGame(field) {
    field.textContent = '';
    console.log('test');
}