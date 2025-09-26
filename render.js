// Board Colors
import { boardColors } from "./settings.js";

// DOM Elements
const board = document.getElementById("board");

// Render Function
export function render(puzzle) {
  let puzzleArray;

  // 16x16
  if (typeof puzzle === "string") {
    puzzleArray = puzzle.split("").map((ch) => {
      if (ch === 0) return null;
      if (/^[1-9]$/.test(ch)) return parseInt(ch, 10);
      if (/^[A-F]$/i.test(ch)) return ch.toUpperCase();
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

  const size = Math.sqrt(puzzleArray.length);
  let sizeSelect = parseInt(
    document.querySelector('input[name="boardSize"]:checked').value,
    10
  );
  const puzzleGrid = [];
  for (let i = 0; i < size; i++) {
    puzzleGrid.push(puzzleArray.slice(i * size, (i + 1) * size));
  }

  board.innerHTML = "";
  for (let row = 0; row < sizeSelect; row++) {
    for (let col = 0; col < sizeSelect; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.style.fontFamily = "Fredoka";

      // Add thicker borders for boxes
      const boxSize = size === 9 ? 3 : 4;
      cell.style.borderColor = boardColors.boardBordersColor;
      if (row % boxSize === 0)
        cell.style.borderTop = `2px solid ${boardColors.boardBordersColor}`;
      if (col % boxSize === 0)
        cell.style.borderLeft = `2px solid ${boardColors.boardBordersColor}`;
      if (row === size - 1)
        cell.style.borderBottom = `2px solid ${boardColors.boardBordersColor}`;
      if (col === size - 1)
        cell.style.borderRight = `2px solid ${boardColors.boardBordersColor}`;

      const value = puzzleGrid[row][col];
      if (value !== null) {
        // hint cell
        cell.style.backgroundColor = boardColors.hintCellBgColor;
        cell.style.color = boardColors.puzzleColor;
        cell.textContent = value;
        cell.classList.add("hint-cell");
        cell.style.display = "flex";
        cell.style.alignItems = "center";
        cell.style.justifyContent = "center";
        cell.style.fontWeight = 600;
      } else {
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
