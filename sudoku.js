// DOM elements
const playBtn = document.getElementById("play");
const board = document.getElementById("board");
const settings = document.getElementsByClassName("settings")[0];
const startBtn = document.getElementById("start");
const backBtn = document.getElementById("back");
const home = document.getElementsByClassName("home")[0];
const howToPlay = document.getElementsByClassName("how-to-play")[0];
const about = document.getElementsByClassName("about")[0];
const loadingPage = document.getElementById("loading-page");
const worker = new Worker("worker.js", { type: "module" });

// Buttons
const btn1 = document.getElementById("one");
const btn2 = document.getElementById("two");
const btn3 = document.getElementById("three");
const btn4 = document.getElementById("four");
const btn5 = document.getElementById("five");
const btn6 = document.getElementById("six");
const btn7 = document.getElementById("seven");
const btn8 = document.getElementById("eight");
const btn9 = document.getElementById("nine");
const erase = document.getElementById("erase");
const note = document.getElementById("note");
const quick = document.getElementById("quickMode");

function nums(btn, cell) {
  btn.addEventListener("click", () => {
    cell.value = btn.textContent;
  });
}

// Board colors
import { boardColors } from "./settings.js";
import { setBgMode } from "./bgAnimation.js";

// Handle messages from the worker
worker.onmessage = function (e) {
  const puzzle = e.data;

  loadingPage.style.display = "none";
  board.style.display = "grid";

  console.log("Generated Sudoku:", puzzle);
  render(puzzle);
};

playBtn.addEventListener("click", () => {
  home.style.display = "none";
  settings.style.display = "flex";
  howToPlay.style.display = "none";
  about.style.display = "none";
  loadingPage.style.display = "none";
  board.style.display = "none";
  setBgMode("images");
});

startBtn.addEventListener("click", () => {
  const dificulty = document.querySelector("input[name='deffeculity']:checked");

  if (!dificulty) {
    alert("Please select a difficulty before starting!");
    return;
  }

  settings.style.display = "none";
  loadingPage.style.display = "block";
  board.style.display = "none";
  backBtn.style.display = "block";

  // Generate the sudoku
  worker.postMessage(dificulty.value);
});

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
      cell.style.borderColor = boardColors.boardBordersColor;
      if (row % 3 === 0)
        cell.style.borderTop = `2px solid ${boardColors.boardBordersColor}`;
      if (col % 3 === 0)
        cell.style.borderLeft = `2px solid ${boardColors.boardBordersColor}`;
      if (row === 8)
        cell.style.borderBottom = `2px solid ${boardColors.boardBordersColor}`;
      if (col === 8)
        cell.style.borderRight = `2px solid ${boardColors.boardBordersColor}`;

      const value = puzzleGrid[row][col];
      if (value !== null) {
        // hint cell
        cell.style.backgroundColor = boardColors.hintCellBgColor;
        cell.style.color = boardColors.puzzleColor;
        cell.textContent = value;
        cell.classList.add("hint-cell");
      } else {
        const input = document.createElement("input");
        input.type = "text";
        input.maxLength = 1;
        [btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9].forEach(
          (btn) => {
            nums(btn, input);
          }
        );

        input.classList.add("puzzle-cell");
        input.dataset.row = row;
        input.dataset.col = col;
        input.style.backgroundColor = boardColors.puzzleCellBgColor;
        input.style.color = boardColors.inputColor;
        input.addEventListener("focus", () => {
          input.style.background = boardColors.inputFocusColor;
          input.style.outline = "none";
        });
        input.addEventListener("blur", () => {
          input.style.background = boardColors.puzzleCellBgColor;
        });
        input.addEventListener("input", (e) => {
          e.target.value = e.target.value.replace(/[^1-9]/g, "");
        });
        cell.appendChild(input);
      }
      board.appendChild(cell);
    }
  }
}
