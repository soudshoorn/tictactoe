const statusDisplay = document.querySelector('.game-status');
const fields = document.querySelectorAll('.board > .field');

// Gebruiken we om de game te pauzeren wanneer hij tot een einde is gekomen
let gameActive = true;
// Huidge speler die aan zet is
let currentPlayer = "X";
// Om de gezette zetten op te slaan
let gameState = ["", "", "", "", "", "", "", "", ""];
// De winnende condities (Elke array lijstje hierin staat voor een winnende conditie)
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const resetButton = document.querySelector(".reset-button");
resetButton.addEventListener('click', handleRestartGame);

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

// Start altijd met een leeg speelveld
handleRestartGame();

for(let i = 0; i < fields.length; i++) {
    const field = fields[i];

    // Click listener die het veld doorgeeft waar op is geklikt
    field.addEventListener('click', function() {
        handleCellClick(field, i,);
    })
}
function handleCellPlayed(i) {
    // Zet in de array op het geklikte veld de naam van de speler die er op heeft geklikt
    gameState[i] = currentPlayer;
}
function handlePlayerChange() {
    // Als het statement waar is wordt het O zoniet dan X
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    // if(currentPlayer === "X"){
    //     currentPlayer = "O";
    // } else {
    //     currentPlayer = "X";
    // }

    statusDisplay.innerHTML = currentPlayerTurn();
}
function handleResultValidation() {
    // Wordt veranderd wanneer ronde klaar is
    let roundWon = false;

    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        // Als er nog geen winnende conditie is ingevuld
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            console.log(a + b + c);
            roundWon = true;
            break
        }
    }
    // Wanneer de ronde is gewonnen toon de winning message en zet de game op pauze
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    // Wanneer het speelveld vol is is de game een draw
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    // Als we tot hier komen weten we dat er nog zetten zijn om gedaan te worden
    handlePlayerChange();
}
function handleComputerMove() {
    const emptyFields = [];
    let randomField;

    if (!gameActive || !gameState.includes("")) {
        return;
    }

    fields.forEach(function(cell){
        if (cell.textContent == '') {
          emptyFields.push(cell);
        }
    });

      randomField = Math.ceil(Math.random() * emptyFields.length -1);
      emptyFields[randomField].innerHTML = currentPlayer;
      handleCellPlayed(randomField);
      handleResultValidation();
      console.log(gameState);
      console.log('emptyFields Lengte: ' + emptyFields.length + ', randomField nummer: ' + randomField);
}
function handleCellClick(field, i) {
    if (gameState[i] !== "" || !gameActive) {
        return;
    }
    // Veranderd het geklikte veld in die van de speler
    field.innerHTML = currentPlayer;
    handleCellPlayed(i);
    handleResultValidation();
    handleComputerMove(i);
}
function handleRestartGame() {
    for(let i = 0; i < fields.length; i++) {
        const field = fields[i];

        gameState[i] = ''; // Reset de array zodat er geen gevulde vakjes meer zijn
        field.innerHTML = ''; // Haal de geplaatste plekken weg
    }
    // Reset de status van het potje
    gameActive = true;
    statusDisplay.innerHTML = currentPlayerTurn();
}
function debug() {
    console.log('gameState Array: ' + gameState + ', emptyFields Lengte: ' + this.emptyFields + ', randomField nummer: ' + this.randomField);
}