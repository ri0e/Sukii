// DOM Elements
let color = document.querySelector('input[name="color"]:checked');
const size = document.querySelector('input[name="boardSize"]:checked');
const dificulty = document.querySelector("input[name='deffeculity']:checked");

// Colors
export let boardColors = {
  hintCellBgColor: "",
  puzzleCellBgColor: "",
  boardBordersColor: "",
  inputColor: "",
  inputFocusColor: "",
  puzzleColor: "#333",
};

// Change Board Colors
function setBoardColors(selectedColor) {
  if (!selectedColor) {
    const colorInput = document.querySelector('input[name="color"]:checked');
    selectedColor = colorInput ? colorInput.value : "blue";
  }

  switch (selectedColor) {
    case "blue":
      boardColors.hintCellBgColor = "#4da6ffff";
      boardColors.puzzleCellBgColor = "#d6ebffff";
      boardColors.boardBordersColor = "#004080";
      boardColors.inputColor = "#1e8ef1ff";
      boardColors.inputFocusColor = "#a3d3ffff";
      break;
    case "red":
      boardColors.hintCellBgColor = "#ff6666ff";
      boardColors.puzzleCellBgColor = "#ffe5e5";
      boardColors.boardBordersColor = "#8b0000";
      boardColors.inputColor = "#ff4d4d";
      boardColors.inputFocusColor = "#ffb3b3ff";
      break;
    case "green":
      boardColors.hintCellBgColor = "#51d680ff";
      boardColors.puzzleCellBgColor = "#dbffe3";
      boardColors.boardBordersColor = "#1b5e20";
      boardColors.inputColor = "#00b894";
      boardColors.inputFocusColor = "#a8ffbbff";
      break;
    case "yellow":
      boardColors.hintCellBgColor = "#ffe366ff";
      boardColors.puzzleCellBgColor = "#fff6cc";
      boardColors.boardBordersColor = "#c79a00";
      boardColors.inputColor = "#ffcc00";
      boardColors.inputFocusColor = "#ffec99ff";
      break;
    case "orange":
      boardColors.hintCellBgColor = "#ffa366ff";
      boardColors.puzzleCellBgColor = "#ffe9d6";
      boardColors.boardBordersColor = "#cc5500";
      boardColors.inputColor = "#ff8c42";
      boardColors.inputFocusColor = "#ffcea3ff";
      break;
    case "purple":
      boardColors.hintCellBgColor = "#bf80ffff";
      boardColors.puzzleCellBgColor = "#f3e0ff";
      boardColors.boardBordersColor = "#4b0082";
      boardColors.inputColor = "#a66cff";
      boardColors.inputFocusColor = "hsla(277, 100%, 84%, 1.00)";
      break;
    case "pink":
      boardColors.hintCellBgColor = "#ff85adff";
      boardColors.puzzleCellBgColor = "#ffe0eb";
      boardColors.boardBordersColor = "#a33b65";
      boardColors.inputColor = "#ff69b4";
      boardColors.inputFocusColor = "#ffadcaff";
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
      cell.classList.add("cell-preview");

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

      const value = puzzle[row][col];
      if (value !== 0) {
        // Hint cell
        cell.textContent = value;
        cell.style.backgroundColor = boardColors.hintCellBgColor;
        cell.style.color = boardColors.puzzleColor;
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
        input.style.fontWeight = "bold";
        input.style.border = "none";
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
