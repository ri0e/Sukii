console.log("hi get out of the console :3");

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
const playPage = document.getElementsByClassName("playPage")[0];
const worker = new Worker("worker.js", { type: "module" });
////
const sudokusPage = document.getElementsByClassName("sudokus")[0];
const sudokusContainer =
  document.getElementsByClassName("sudokus-container")[0];

import { render } from "./render.js";
import { setBgMode } from "./bgAnimation.js";

// Handle messages from the worker
worker.onmessage = function (e) {
  const { puzzles, solutions, selectedLength } = e.data;

  loadingPage.style.display = "none";
  sudokusPage.style.display = "flex";

  sudokusContainer.innerHTML = "";

  for (let i = 0; i < selectedLength; i++) {
    const sudokusBtn = document.createElement("button");
    sudokusBtn.textContent = i;
    sudokusBtn.id = `sudoku ${i}`;
    sudokusBtn.className = "sudokus-levels";

    sudokusBtn.addEventListener("click", () => {
      sudokusPage.style.display = "none";
      playPage.style.display = "flex";
      board.style.display = "grid";
      render(puzzles[i]);
      console.log(solutions[i]);
    });
    sudokusContainer.appendChild(sudokusBtn);
  }
};

playBtn.addEventListener("click", () => {
  home.style.display = "none";
  settings.style.display = "flex";
  howToPlay.style.display = "none";
  about.style.display = "none";
  loadingPage.style.display = "none";
  playPage.style.display = "none";
  board.style.display = "none";
  setBgMode("images");
});

startBtn.addEventListener("click", () => {
  const difficulty = document.querySelector(
    "input[name='deffeculity']:checked"
  );

  if (!difficulty) {
    alert("Please select a difficulty before starting!");
    return;
  }

  let sizeSelect = document.querySelector('input[name="boardSize"]:checked');
  const size = parseInt(sizeSelect.value, 10);

  const level = difficulty.value;

  settings.style.display = "none";
  loadingPage.style.display = "block";
  board.style.display = "none";
  backBtn.style.display = "block";

  worker.postMessage({ size, level });
});
