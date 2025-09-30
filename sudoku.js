console.log("hi get out of the console :3");

// ================== DOM ELEMENTS ==================
// Buttons
const playBtn = document.getElementById("play");
const startBtn = document.getElementById("start");
const backBtn = document.getElementById("back");
const backToSettingsBtn = document.getElementById("back-to-settings");
const checkSolBtn = document.getElementById("check-sol");
const winBtn = document.getElementById("win-go-home");
const tryAgainBtn = document.getElementById("re-try");

// Pages & Containers
const board = document.getElementById("board");
const settings = document.querySelector(".settings");
const home = document.querySelector(".home");
const howToPlay = document.querySelector(".how-to-play");
const about = document.querySelector(".about");
const loadingPage = document.getElementById("loading-page");
const playPage = document.querySelector(".playPage");
const sudokusPage = document.querySelector(".sudokus");
const sudokusContainer = document.querySelector(".sudokus-container");
const winDiv = document.getElementsByClassName("check-sol-div")[0];
const tryAgainDiv = document.getElementsByClassName("check-sol-div-not-win")[0];

// Error elements
const errorSizeDiv = document.getElementById("error-size");
const errorDiffiDiv = document.getElementById("error-diffi");
const warningColorDiv = document.getElementById("warning-color");
const okbtnSize = document.getElementById("ok-size");
const okbtnDiffi = document.getElementById("ok-diffi");
const okbtnColor = document.getElementById("ok-color");

// ================== WORKER & IMPORTS ==================
const worker = new Worker("worker.js", { type: "module" });
import { render } from "./render.js";

// ================== WORKER MESSAGE HANDLER ==================
let currentSudoku;
let currentSol;
worker.onmessage = function (e) {
  const { puzzles, solutions, selectedLength } = e.data;

  // Switch pages
  loadingPage.style.display = "none";
  sudokusPage.style.display = "flex";
  sudokusContainer.innerHTML = "";

  // Create Sudoku level buttons
  puzzles.slice(0, selectedLength).forEach((puzzle, i) => {
    const sudokusBtn = document.createElement("button");
    sudokusBtn.textContent = i + 1;
    sudokusBtn.className = "sudokus-levels";

    sudokusBtn.addEventListener("click", () => {
      sudokusPage.style.display = "none";
      playPage.style.display = "flex";
      board.style.display = "grid";
      render(puzzle);

      currentSudoku = puzzle;
      currentSol = solutions[i];
    });

    sudokusContainer.appendChild(sudokusBtn);
  });
};

// ================== HELPERS ==================
function showError(div, show) {
  div.style.display = show ? "block" : "none";
}

// Dismiss error popups when OK clicked
okbtnSize.addEventListener("click", () => showError(errorSizeDiv, false));
okbtnDiffi.addEventListener("click", () => showError(errorDiffiDiv, false));
okbtnColor.addEventListener("click", () => showError(warningColorDiv, false));

// ================== EVENT LISTENERS ==================
playBtn.addEventListener("click", () => {
  switchPage(settings);
});

let colorWarningShown = false;

startBtn.addEventListener("click", () => {
  const difficulty = document.querySelector(
    "input[name='deffeculity']:checked"
  );
  const sizeSelect = document.querySelector("input[name='boardSize']:checked");
  const colorSelect = document.querySelector("input[name='color']:checked");

  const size = sizeSelect ? parseInt(sizeSelect.value, 10) : null;
  const level = difficulty ? difficulty.value : null;
  const color = colorSelect ? colorSelect.value : null;

  if (!size) {
    showError(errorSizeDiv, true);
    errorSizeDiv.classList.add("shown");
    return;
  } else if (!level) {
    showError(errorDiffiDiv, true);
    errorDiffiDiv.classList.add("shown");
    return;
  } else if (!color && level && size && !colorWarningShown) {
    showError(warningColorDiv, true);
    colorWarningShown = true;
    warningColorDiv.classList.add("shown");
    return;
  }

  switchPage(loadingPage);
  backBtn.style.display = "block";
  worker.postMessage({ size, level });
});

checkSolBtn.addEventListener("click", () => {
  const userInput = getUserInputs();
  const userBoard = buildUserBoard(userInput, currentSudoku);

  if (checkSolution(userBoard, currentSol)) {
    winDiv.style.display = "block";
  } else {
    tryAgainDiv.style.display = "block";
  }
});

winBtn.addEventListener("click", () => {
  location.reload();
});

tryAgainBtn.addEventListener("click", () => {
  tryAgainDiv.style.display = "none";
});

document.addEventListener("DOMContentLoaded", () => {
  const backToSettingsBtn = document.getElementById("back-to-settings");
  backToSettingsBtn.addEventListener("click", () => {
    sudokusPage.style.display = "none";
    settings.style.display = "flex";
  });
});

// ================== PAGE MANAGEMENT ==================
function switchPage(visiblePage) {
  [home, settings, howToPlay, about, loadingPage, playPage, board].forEach(
    (page) => (page.style.display = "none")
  );
  visiblePage.style.display = "flex";
}

// ================== SOLUTION CHECKING ==================
function getUserInputs() {
  const cells = document.querySelectorAll("#board .puzzle-cell");
  return Array.from(cells).map((cell) => {
    const val = parseInt(cell.textContent, 10);
    return isNaN(val) ? 0 : val;
  });
}

function buildUserBoard(userInput, puzzle) {
  let userBoard = [];
  let inputIndex = 0;

  for (let i = 0; i < puzzle.length; i++) {
    userBoard[i] = puzzle[i] === 0 ? userInput[inputIndex++] : puzzle[i];
  }
  return userBoard;
}

function checkSolution(userBoard, solution) {
  return userBoard.every((val, idx) => val === solution[idx]);
}
