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
let selectedInput = null;

import { render } from "./render.js";
import { setBgMode } from "./bgAnimation.js";

// Handle messages from the worker
worker.onmessage = function (e) {
  const puzzle = e.data;

  loadingPage.style.display = "none";
  playPage.style.display = "flex";
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
