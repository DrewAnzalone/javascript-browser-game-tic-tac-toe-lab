/*-------------------------------- Constants --------------------------------*/

const print = console.log;
const board = Array(9);
const winStates = [[0, 1, 2], [0, 4, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]];

/*---------------------------- Variables (state) ----------------------------*/

let Xturn = true;
let boardState = 0;

/*------------------------ Cached Element References ------------------------*/

const tiles = document.querySelectorAll(".sqr");
const messageDiv = document.querySelector("#message");
const reset = document.querySelector("#reset");


/*-------------------------------- Functions --------------------------------*/

function init() {
  board.fill('');
  Xturn = true;
  boardState = 0;
  render(boardState);
}
init()

function render(result) {
  // updateBoard()
  tiles.forEach((tile) => {
    tile.innerHTML = board[tile.id];
  });

  switch (result) {
    case 0: // game is ongoing
      messageDiv.innerHTML = `It's ${Xturn ? 'X' : 'O'}'s turn`;
      break;
    case 1: // game has a winner
      messageDiv.innerHTML = (Xturn ? "O" : "X") + " wins!"; // reversed because the turn is swapped after every move
      break;
    case 2: // game is a tie
      messageDiv.innerHTML = "Tie game!";
      break;
  }
}

function handleClick(event) {
  if (board[event.target.id] || boardState) return // no overriding tiles or playing after game ends
  board[event.target.id] = Xturn ? "X" : "O";
  Xturn = !Xturn; // switchPlayerTurn()
  boardState = endGame();
  render(boardState);
}

function endGame() {
  let player;
  for (const winState of winStates) {
    player = board[winState[0]];
    if (player &&
      player === board[winState[1]] &&
      player === board[winState[2]]) {
      return 1; // winner found
    }
  }
  if (board.every(Boolean)) return 2; // draw
  return 0; // game continues
}

/*----------------------------- Event Listeners -----------------------------*/

tiles.forEach((tile) => {
  tile.addEventListener('click', handleClick);
});

reset.addEventListener('click', init);
