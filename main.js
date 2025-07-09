// Variables
const selection = document.querySelectorAll(".choice");
const replay = document.querySelector("#replay");
const roundResults = document.querySelector(".round-results");
const playerScore = document.querySelector("#player-score");
const playerPick = document.querySelector(".player--choice");
const computerScore = document.querySelector("#computer-score");
const computerPick = document.querySelector(".computer--choice");
const rounds = document.querySelector(".rounds");
let toggle = document.getElementById("replay");

const winnerResults = {
  computer: "You lost the game!",
  player: "You won the game!",
};
let computerChoices = ["Rock", "Paper", "Scissors"];
let playerPoints = 0;
let computerPoints = 0;
let round = 1;

// Functions

function computerPlay() {
  let result = computerChoices[Math.floor(Math.random() * computerChoices.length)];
  computerPick.textContent = result;
  return result;
}

function playRound(playerSelection, computerSelection) {
  let roundWinCombo = `${playerSelection}-${computerSelection}`;
  let playerWinCombo = [`Rock-Scissors`, `Scissors-Paper`, `Paper-Rock`];

  if (playerSelection === computerSelection) {
    roundResults.textContent = "Tie!";
  } else if (playerWinCombo.includes(roundWinCombo)) {
    playerScore.textContent = ++playerPoints;
    roundResults.textContent = `${playerSelection} beats ${computerSelection}! You win!`;
  } else {
    computerScore.textContent = ++computerPoints;

    roundResults.textContent = `${computerSelection} beats ${playerSelection}! You lose!`;
  }
  checkWinner();
}

function checkWinner() {
  if (computerPoints === 5 || playerPoints === 5) {
    let win = `${computerPoints > playerPoints ? "computer" : "player"}`;
    selection.forEach(button => button.removeEventListener("click", getPlayerChoice));
    roundResults.textContent = winnerResults[win];
    toggle.classList.toggle("hide");
  }
}

function handleReplay() {
  playerPick.textContent = "?";
  computerPick.textContent = "?";
  playerPoints = 0;
  playerScore.textContent = "0";
  computerPoints = 0;
  computerScore.textContent = "0";
  roundResults.textContent = "";
  selection.forEach(button => button.addEventListener("click", getPlayerChoice));
  toggle.classList.toggle("hide");
  round++;
  rounds.textContent = `Round ${round}`;
}

function getPlayerChoice(e) {
  let playerSelection = e.target.id;
  playerPick.textContent = e.target.id;
  playRound(playerSelection, computerPlay());
}

// Event Listeners

selection.forEach(button => button.addEventListener("click", getPlayerChoice));
replay.addEventListener("click", handleReplay);
