const statusDisplay = document.querySelector('.game-status'); // Haal het element op die de status van het potje weergeeft
const fields = document.querySelectorAll('.board > .field'); // Haal alle elementen met de field class op binnen de class board
const table = document.querySelector('.table'); // Haal de tabel op waar alles in zit van het spel

const chooseGame = document.querySelector('.choose-game'); // Haal de kies ene game modes div op
const maxScoreWrapper = document.querySelector('.choose-maxscore'); // Haalt de parent div van maxcore op
const scoreWinnerMessage = document.querySelector('.maxscore-winner') // Haal het win bericht op
const maxScoreWinner = document.querySelector('.final-winner'); // Haalt de winner div op
const finalScore = document.querySelector('.final-score'); // Haalt de uiteindelijke score op
const pickModeButton = document.querySelector('.pick-mode-button'); // Haal de kies nieuwe modus button op
const computerModeButton = document.querySelector('.computer'); // Haal de computer modes button op
const personModeButton = document.querySelector('.person'); // Haal de persoon modes button op
const playAgainButton = document.querySelector('.playagain-button'); // Haal de speel opnieuw button op
const maxScoreButton = document.querySelectorAll('.maxscore-buttons'); // Haalt alle max score buttons op
const gameScore = document.querySelector('.game-score'); // Haal de persoon modes button op


// Scores
let scorePlayerX = 0;
let scorePlayerO = 0;

// Winnaar is degene die deze maxscore behaalt!
let maxScore = 0;
// Kijk of persoon wilt spelen tegen iemand of tegen de computer
let computerMode = true;
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

// Wanneer er word gekozen voor de computer modes, zet dan de variabele op true en laat het spel zien
computerModeButton.addEventListener('click', function() {
    computerMode = true;

    chooseGame.classList.add('hidden');
    maxScoreWrapper.classList.remove('hidden');
})

// Wanneer er word gekozen voor de personen modes, zet dan de variabele op false en laat het spel zien
personModeButton.addEventListener('click', function() {
    computerMode = false;

    chooseGame.classList.add('hidden');
    maxScoreWrapper.classList.remove('hidden');
})

playAgainButton.addEventListener('click', function() {
    chooseGame.classList.remove('hidden');
    maxScoreWinner.classList.add('hidden');
    handleRestartGame();
    scorePlayerX = 0;
    scorePlayerO = 0;
    handleUpdateScore();
})

// Kijk op welke knop voor de maxscore er is geklikt
for (let i = 0; i < maxScoreButton.length; i++) {
    let clickedScore = maxScoreButton[i];
    clickedScore.addEventListener("click", function() {
        if(clickedScore.textContent == '3'){
            maxScore = 3;
        } else if (clickedScore.textContent == '5'){
            maxScore = 5;
        } else {
            maxScore = 10;
        }
        maxScoreWrapper.classList.add('hidden');
        resetButton.classList.remove('hidden');
        table.classList.remove('hidden');
        pickModeButton.classList.remove('hidden');
        gameScore.classList.remove('hidden');
    });
    
}

// Wanneer er word gekozen voor de personen modes, zet dan de variabele op false en laat het spel zien
pickModeButton.addEventListener('click', function() {
    scorePlayerX = 0;
    scorePlayerO = 0;
    handleUpdateScore();

    chooseGame.classList.remove('hidden');
    resetButton.classList.add('hidden');
    table.classList.add('hidden');
    pickModeButton.classList.add('hidden');
    gameScore.classList.add('hidden');
    handleRestartGame();
})

// Haal de reset button op en maak daar een click listener aan vast
const resetButton = document.querySelector(".reset-button");
resetButton.addEventListener('click', handleRestartGame);

// Variable voor de status van het potje
const winningMessage = () => `${currentPlayer} heeft gewonnen! <i class="fas fa-birthday-cake"></i>`;
const drawMessage = () => `Het is gelijkspel geworden!`;
const currentPlayerTurn = () => `${currentPlayer} is aan de beurt`;

// Laat de status van het potje zien
statusDisplay.innerHTML = currentPlayerTurn();

handleRestartGame(); // Start altijd met een leeg speelveld
handleUpdateScore(); // Update altijd de score bij een nieuwe game

for(let i = 0; i < fields.length; i++) {
    const field = fields[i];

    // Click listener die het veld doorgeeft waar op is geklikt
    field.addEventListener('click', function() {
        handleCellClick(field, i,);
    })
}
function handleUpdateScore() {
    // De HTML voor de score
    gameScore.innerHTML = `<i class="fas fa-times"></i> ${scorePlayerX} - ${scorePlayerO} <i class="far fa-circle"></i>`;
}
function handleCellPlayed(i) {
    gameState[i] = currentPlayer; // Zet in de array op het geklikte veld de naam van de speler die er op heeft geklikt
}
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X"; // Als het statement waar is wordt het O zoniet dan X

    statusDisplay.innerHTML = currentPlayerTurn(); // Laat zien wie aan de beurt is, of wie heeft gewonnen.
}
function handleResultValidation() {
    let roundWon = false; // Wordt veranderd wanneer ronde klaar is

    // Gaat door alle win combinaties
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

        // Kijk wie er heeft gewonnen en geef hem +1 score
        if (currentPlayer == 'O'){
            scorePlayerO = scorePlayerO + 1;
            handleUpdateScore();
        } else {
            scorePlayerX = scorePlayerX + 1;
            handleUpdateScore();
        }

        // Controleer of iemand die maxscore die is gekozen heeft bereikt
        if (scorePlayerO == maxScore || scorePlayerX == maxScore){
            handleMaxScoreWinner();
        }

        return;
    }

    // Wanneer het speelveld vol is is de game een draw
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange(); // Als we tot hier komen weten we dat er nog zetten zijn om gedaan te worden
}
function handleComputerMove() {
    // Nieuwe variable voor array waar lege velden in worden gezet & het gekozen random veld
    const emptyFields = [];
    let randomField;

    // Kijk of de game is afgelopen of dat het veld waarop word geklikt is al gekozen is
    if (!gameActive || !gameState.includes("")) {
        return;
    }

    // Kijk naar elk veld of deze leeg is, als deze leeg is zet hem in de nieuwe array
    fields.forEach(function(cell, i){
        if (cell.innerHTML == '') {
          emptyFields.push(i);
        }
    });
    
    randomField = emptyFields[Math.floor(Math.random() * emptyFields.length)]; // Genereer een random nummer dat minder is dan de hudige velden
    
    // Laat de computer na 0,7 seconden een zet maken
    setTimeout(function() {
        fields[randomField].innerHTML = currentPlayer;
        handleCellPlayed(randomField);
        handleResultValidation();   
      }, 350);
}
function handleCellClick(field, i) {

    // Kijk of de game is afgelopen of dat het veld waarop word geklikt is al gekozen is
    if (gameState[i] !== "" || !gameActive) {
        return;
    }

    // Veranderd het geklikte veld in die van de speler & roep de functies aan
    field.innerHTML = currentPlayer;
    handleCellPlayed(i);
    handleResultValidation();
    if (computerMode){
        handleComputerMove(i);
    } else {
        return;
    }
}
function handleRestartGame() {
    // Ga door alle velden heen en maak per veld een variable
    for(let i = 0; i < fields.length; i++) {
        const field = fields[i];

        gameState[i] = ''; // Reset de array zodat er geen gevulde vakjes meer zijn
        field.innerHTML = ''; // Haal de geplaatste plekken weg
        currentPlayer = 'X';
    }

    // Reset de status van het potje
    gameActive = true;
    statusDisplay.innerHTML = currentPlayerTurn();

}
function handleComputerMode(){
    computerMode = true;
}
function handleMaxScoreWinner(){
    maxScoreWinner.classList.remove('hidden');
    playAgainButton.classList.remove('hidden');
    chooseGame.classList.add('hidden');
    resetButton.classList.add('hidden');
    table.classList.add('hidden');
    pickModeButton.classList.add('hidden');
    gameScore.classList.add('hidden');

    if (currentPlayer == 'X'){
        scoreWinnerMessage.innerHTML = `Gefeliciteerd. speler <i class="fas fa-times winnericon"></i> heeft gewonnen!`;
    } else {
        scoreWinnerMessage.innerHTML = `Gefeliciteerd. speler <i class="far fa-circle winnericon"></i> heeft gewonnen!`;
    }
    finalScore.innerHTML = `<i class="fas fa-times"></i> ${scorePlayerX} - ${scorePlayerO} <i class="far fa-circle"></i>`;

}
function debug() {
    console.log(gameState); // Log de array met gekozen velden
}