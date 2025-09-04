import { generate, solve } from "https://esm.sh/sudoku-core";

let currentSudoku;

function renderBoard(puzzle) {
  const boardDiv = document.getElementById("board");
  const table = document.createElement("table");

  for (let row = 0; row < 9; row++) {
    const tr = document.createElement("tr");
    for (let col = 0; col < 9; col++) {
      const td = document.createElement("td");
      const value = puzzle[row * 9 + col];

      if (value) {
        // clue
        td.textContent = value;
        td.className = "clue";
      } else {
        // empty -> input
        const input = document.createElement("input");
        input.type = "text";
        input.maxLength = 1;
        input.addEventListener("input", (e) => {
          e.target.value = e.target.value.replace(/[^1-9]/g, "");
        });
        td.appendChild(input);
      }

      tr.appendChild(td);
    }
    table.appendChild(tr);
  }

  boardDiv.innerHTML = "";
  boardDiv.appendChild(table);
}

function newSudoku() {
  currentSudoku = generate("hard");
  renderBoard(currentSudoku);
}

// Initialize game
document.getElementById("new-game").addEventListener("click", newSudoku);
