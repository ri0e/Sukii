// DOM Elements
let color = document.querySelector('input[name="color"]:checked');
const size = document.querySelector('input[name="boardSize"]:checked');
const dificulty = document.querySelector("input[name='deffeculity']:checked");

// Colors
let hintCellBgColor;
let puzzleCellBgColor;
let boardBordersColor;
let inputColor;
let puzzleColor = "#333";

// Change Board Colors
function setBoardColors(selectedColor) {
  if (!selectedColor) {
    const colorInput = document.querySelector('input[name="color"]:checked');
    selectedColor = colorInput ? colorInput.value : "blue";
  }

  switch (selectedColor) {
    case "blue":
      hintCellBgColor = "#e0f0ff";
      puzzleCellBgColor = "#f0f8ff";
      boardBordersColor = "#095190";
      inputColor = "#1f8ef1";
      break;
    case "red":
      hintCellBgColor = "#ffe6e6";
      puzzleCellBgColor = "#fff5f5";
      boardBordersColor = "#c92a2a";
      inputColor = "#ff4d4d";
      break;
    case "green":
      hintCellBgColor = "#e6ffe6";
      puzzleCellBgColor = "#f6fff6";
      boardBordersColor = "#007f5f";
      inputColor = "#00b894";
      break;
    case "yellow":
      hintCellBgColor = "#fff9e6";
      puzzleCellBgColor = "#fffef5";
      boardBordersColor = "#f4b400";
      inputColor = "#ffcc00";
      break;
    case "orange":
      hintCellBgColor = "#fff0e6";
      puzzleCellBgColor = "#fffaf5";
      boardBordersColor = "#d35400";
      inputColor = "#ff8c42";
      break;
    case "purple":
      hintCellBgColor = "#f5e6ff";
      puzzleCellBgColor = "#fcf7ff";
      boardBordersColor = "#6f42c1";
      inputColor = "#a66cff";
      break;
    case "pink":
      hintCellBgColor = "#ffe6f1";
      puzzleCellBgColor = "#fff5fa";
      boardBordersColor = "#d63384";
      inputColor = "#ff69b4";
      break;
  }
  renderPreview(previewBoard);
}

// Preview Sudoku Board
let previewBoard = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

// Render Preview Board
function renderPreview(puzzle) {
  const board = document.getElementById("preview-board");
  board.innerHTML = "";

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      // Add thicker borders for 3x3 boxes
      cell.style.borderColor = boardBordersColor;
      if (row % 3 === 0)
        cell.style.borderTop = `2px solid ${boardBordersColor}`;
      if (col % 3 === 0)
        cell.style.borderLeft = `2px solid ${boardBordersColor}`;
      if (row === 8) cell.style.borderBottom = `2px solid ${boardBordersColor}`;
      if (col === 8) cell.style.borderRight = `2px solid ${boardBordersColor}`;

      const value = puzzle[row][col];
      if (value !== 0) {
        // Hint cell
        cell.textContent = value;
        cell.style.backgroundColor = hintCellBgColor;
        cell.style.color = puzzleColor;
        cell.style.fontWeight = "bold";
      } else {
        // Puzzle cell
        const input = document.createElement("input");
        input.type = "text";
        input.maxLength = 1;
        input.dataset.row = row;
        input.dataset.col = col;

        input.style.width = "100%";
        input.style.height = "100%";
        input.style.textAlign = "center";
        input.style.fontSize = "1rem";
        input.style.fontFamily = "Fredoka";
        input.style.border = "none";
        input.style.backgroundColor = puzzleCellBgColor;
        input.style.color = inputColor;
        input.addEventListener("input", (e) => {
          e.target.value = e.target.value.replace(/[^1-9]/g, "");
        });

        cell.appendChild(input);
      }
      board.appendChild(cell);
    }
  }
}

// Event Listener for Radio Buttons
document.addEventListener("DOMContentLoaded", () => {
  const radios = document.querySelectorAll('input[name="color"]');

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      setBoardColors(radio.value);
    });
  });
  setBoardColors();
});

renderPreview(previewBoard);
