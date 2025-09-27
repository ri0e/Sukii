// Board Colors
import { boardColors } from "./settings.js";

// DOM Elements
const board = document.getElementById("board");
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
const quick = document.getElementById("quickMode");
let selectedInput = null;

function getBoxSize(size) {
  if (size === 6) return 3;
  return Math.sqrt(size);
}

// Render Function
export function render(puzzle) {
  let puzzleArray;

  // 16x16
  if (typeof puzzle === "string") {
    puzzleArray = puzzle.split("").map((ch) => {
      if (ch === "0") return null;
      if (/^[1-9]$/.test(ch)) return parseInt(ch, 10);
      if (/^[A-Z]$/i.test(ch)) return ch.toUpperCase();
    });
  }
  // others
  else if (Array.isArray(puzzle)) {
    puzzleArray = puzzle.map((n) => (n === 0 ? null : n));
  } // Invalid Puzzle
  else {
    console.log("Invalid puzzle format:", puzzle);
    return;
  }

  console.log(puzzleArray);
  const size = Math.sqrt(puzzleArray.length);
  let sizeSelect = parseInt(
    document.querySelector('input[name="boardSize"]:checked').value,
    10
  );
  const puzzleGrid = [];
  for (let i = 0; i < size; i++) {
    puzzleGrid.push(puzzleArray.slice(i * size, (i + 1) * size));
  }

  // Board Style
  console.log(sizeSelect);
  board.style.gridTemplateColumns = `repeat(${size},4rem)`;
  board.style.gridTemplateRows = `repeat(${size}, 4rem)`;

  board.innerHTML = "";
  for (let row = 0; row < sizeSelect; row++) {
    for (let col = 0; col < sizeSelect; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.style.fontFamily = "Fredoka";

      // Add thicker borders for boxes
      cell.style.border = `1px solid #333`;
      cell.style.borderColor = boardColors.boardBordersColor;
      if (row % getBoxSize(size) === 0)
        cell.style.borderTop = `2px solid ${boardColors.boardBordersColor}`;
      if (col % getBoxSize(size) === 0)
        cell.style.borderLeft = `2px solid ${boardColors.boardBordersColor}`;
      if (row === sizeSelect - 1)
        cell.style.borderBottom = `2px solid ${boardColors.boardBordersColor}`;
      if (col === sizeSelect - 1)
        cell.style.borderRight = `2px solid ${boardColors.boardBordersColor}`;

      const value = puzzleGrid[row][col];
      if (value !== null) {
        // hint cell
        cell.style.backgroundColor = boardColors.hintCellBgColor;
        cell.style.color = boardColors.puzzleColor;
        cell.textContent = value;
        cell.classList.add("hint-cell");
        cell.style.fontWeight = 600;
        cell.style;
      } else {
        // Puzzle cell
        const input = document.createElement("div");
        input.tabIndex = 0;
        input.classList.add("puzzle-cell");
        input.style.backgroundColor = boardColors.puzzleCellBgColor;
        input.style.color = boardColors.inputColor;

        input.addEventListener("click", () => {
          if (selectedInput) {
            selectedInput.classList.remove("selected");
            selectedInput.style.backgroundColor = boardColors.puzzleCellBgColor;
          }
          input.style.backgroundColor = boardColors.inputFocusColor;
          selectedInput = input;
          selectedInput.classList.add("selected");
          input.focus();
        });
        cell.appendChild(input);
      }
      board.appendChild(cell);
    }
  }
}

// Buttons control (for all devices)
[btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9].forEach((btn) => {
  btn.addEventListener("click", () => {
    if (selectedInput) {
      selectedInput.textContent = btn.textContent;
    }
  });
});

erase.addEventListener("click", () => {
  if (selectedInput) {
    selectedInput.textContent = "";
  }
});

// Keyboard controls (desktop only)
document.addEventListener("keydown", (e) => {
  if (!selectedInput) return;

  if (/[1-9]/.test(e.key)) {
    selectedInput.textContent = e.key;
  } else if (e.key === "Backspace" || e.key === "Delete") {
    selectedInput.textContent = "";
  }
});
