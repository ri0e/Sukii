console.log(
  'go to "https://github.com/ri0e/Sukii/blob/main/loadingPages.js" line 28 OwO'
);

// DOM elements
const home = document.getElementsByClassName("home")[0];
const how = document.getElementsByClassName("how-to-play")[0];
const about = document.getElementsByClassName("about")[0];
const loadingDiv = document.getElementById("loading-page");

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
  home.style.display = "none";
  how.style.display = "none";
  about.style.display = "none";
  loadingDiv.style.display = "block";
}

function hideLoadingPage() {
  loadingDiv.style.display = "none";
  home.style.display = "block";
  how.style.display = "block";
  about.style.display = "block";
}
