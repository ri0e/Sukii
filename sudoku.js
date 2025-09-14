// DOM elements
const playBtn = document.getElementById("play");
const board = document.getElementById("board");
const settings = document.getElementsByClassName("settings")[0];
const home = document.getElementsByClassName("home")[0];
const howToPlay = document.getElementsByClassName("how-to-play")[0];
const about = document.getElementsByClassName("about")[0];
const loadingDiv = document.getElementById("loading-page");
const worker = new Worker("worker.js", { type: "module" });

// Handle messages from the worker
worker.onmessage = function (e) {
  const puzzle = e.data;

  hideLoadingPage();
  console.log("Generated Sudoku:", puzzle);
  render(puzzle);
};

function playSukii(level) {
  showSettingsPage();
  worker.postMessage(level);
}

playBtn.addEventListener("click", () => playSukii("medium"));

// Show and hide settings page functions
function showSettingsPage() {
  settings.style.display = "flex";
  home.style.display = "none";
  howToPlay.style.display = "none";
  about.style.display = "none";
}

function hideSettingsPage() {
  settings.style.display = "none";
  showLoadingPage();
}

// Show and hide loading page functions
function showLoadingPage() {
  loadingDiv.style.display = "block";
  settings.style.display = "none";
}

function hideLoadingPage() {
  loadingDiv.style.display = "none";
  board.style.display = "grid";
}

function render(puzzle) {
  // convert puzzle to 9x9
  let puzzleGrid;

  if (Array.isArray(puzzle) && puzzle.length === 81) {
    puzzleGrid = [];
    for (let i = 0; i < 9; i++) {
      puzzleGrid.push(puzzle.slice(i * 9, (i + 1) * 9));
    }
  } else {
    console.error("Invalid puzzle format:", puzzle);
    return;
  }

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      // Add thicker borders for 3x3 boxes
      if (row % 3 === 0) cell.style.borderTop = "2px solid #333";
      if (col % 3 === 0) cell.style.borderLeft = "2px solid #333";
      if (row === 8) cell.style.borderBottom = "2px solid #333";
      if (col === 8) cell.style.borderRight = "2px solid #333";

      const value = puzzleGrid[row][col];
      if (value !== null) {
        cell.textContent = value;
        cell.classList.add("hint-cell");
      } else {
        const input = document.createElement("input");
        input.type = "text";
        input.maxLength = 1;
        input.classList.add("puzzle-cell");
        input.dataset.row = row;
        input.dataset.col = col;
        input.addEventListener("input", (e) => {
          e.target.value = e.target.value.replace(/[^1-9]/g, "");
        });
        cell.appendChild(input);
      }
      board.appendChild(cell);
    }
  }
}
