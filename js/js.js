// Title slides down when page is opened
const title = document.getElementById("title");

gsap.from(title, {
  duration: 2,
  y: -110,
  ease: "bounce",
  delay: 0.7,
});
//
let currentPlayer = "player1";
let gameboard = ["", "", "", "", "", "", "", "", ""];
let gameover = false;
//
let player1Wins = 0;
let player2Wins = 0;
let ties = 0;

function updateWinCount(winner) {
  if (winner === "player1") {
    player1Wins++;
  } else if (winner === "player2") {
    player2Wins++;
  } else {
    ties++;
  }

  console.log(`Player 1 wins: ${player1Wins}`);
  console.log(`Player 2 wins: ${player2Wins}`);
  console.log(`Ties: ${ties}`);
}

// Player function

function handlePlayerTurn(cell, index) {

  // Check if the game is over and check cels 
  if (gameover || gameboard[index]) {
    return;
  }

  gameboard[index] = currentPlayer;

 // Using GSAP to show the X or O symboles
 gsap.to(cell, { duration: 0.1, scale: 1.1, onComplete: () => {
    cell.textContent = gameboard[index] === "player1" ? "X" : "O";
    cell.classList.add(currentPlayer);
    gsap.to(cell, { duration: 0.1, scale: 1 });
  }});
  
  // Check if the current player has won the game
  if (checkWin()) {
    displayStatus(`Player ${currentPlayer} wins!`);
    gameover = true;
    updateWinCount(currentPlayer);
    return;
  }

  // Check if the game is tie and update tie count
  if (checkTie()) {
    displayStatus("Tie game!");
    gameover = true;
    return;
  }

  // Switch to the next player
  currentPlayer = currentPlayer === "player1" ? "player2" : "player1";
  displayStatus(`Player ${currentPlayer} turn`);
}

// Check if the current player has won the game// Combination grid from the internet - at the moment works perfectly//
function checkWin() {
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

  const isWin = winningCombinations.some((combination) => {
    return combination.every((index) => {
      return gameboard[index] === currentPlayer;
    });
  });

  return isWin;
}

// Define a function to check if the game is a tie
function checkTie() {
  const isTie = gameboard.every((cell) => {
    return cell !== "";
  });

  if (isTie) {
    updateWinCount(null);
  }

  return isTie;
}

// function to reset the game 

function resetGame() {
  currentPlayer = "player1";
  gameboard = ["", "", "", "", "", "", "", "", ""];
  gameover = false;

  // IMplimented animation to reset the gameboard display and sound effect
  const cells = document.querySelectorAll(".grid");
  cells.forEach((cell) => {
    gsap.to(cell, { duration: 0.5, scale: 0, onComplete: () => {
      cell.textContent = "";
      cell.classList.remove("player1", "player2", "winning-cell");
      gsap.to(cell, { duration: 0.5, scale: 1 });
    }});
  });

  displayStatus(`Player ${currentPlayer} turn`);

  const resetSound = document.getElementById("reset-sound");
  resetSound.currentTime = 0.1;
  resetSound.play();
}

// Game status 
function displayStatus(message) {
  const status = document.querySelector("#status");
  status.textContent = message;
}

// event listeners for the grid elements and reset button + animations
const cells = document.querySelectorAll(".grid");
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    handlePlayerTurn(cell, index);
  });
});

const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", () => {
resetGame();
});

gsap.from(resetButton, {
  duration: 2,
  yPercent: 100,
  ease: "bounce",
  delay: 0.7,
});

gsap.to(resetButton, { 
  duration: 2, 
  rotation: 360, 
  
  delay: 2.7 
});

