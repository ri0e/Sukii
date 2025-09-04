// DOM elements
const playBtn = document.getElementById("play");
const worker = new Worker("worker.js", { type: "module" });

// Handle messages from the worker
worker.onmessage = function (e) {
  const puzzle = e.data;

  hideLoadingPage();

  console.log("Generated Sudoku:", puzzle);
};

function playSukii(level) {
  showLoadingPage();

  worker.postMessage(level);
}

playBtn.addEventListener("click", () => playSukii("expert"));

// Show and hide loading page function
function showLoadingPage() {
  const loadingDiv = document.getElementById("loading-page");
  loadingDiv.style.display = "block";
}

function hideLoadingPage() {
  const loadingDiv = document.getElementById("loading-page");
  loadingDiv.style.display = "none";
}
