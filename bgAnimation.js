// Set up canvas
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

const cellSize = 100;
const speedX = -0.7;
const speedY = 1.4;

let cells = [];
let lastTime = 0;
const fpsInterval = 1000 / 60;

// Control the loading page mode
let bgMode = "numbers";

// Resize canvas function (need fix)
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cells = [];
  generateCells();
}

// Load kaomoji Imgs
const kaomojiSources = [
  "./assets/kittens/0.png",
  "./assets/kittens/1.png",
  "./assets/kittens/2.png",
  "./assets/kittens/3.png",
  "./assets/kittens/4.png",
  "./assets/kittens/5.png",
  "./assets/kittens/6.png",
  "./assets/kittens/7.png",
  "./assets/kittens/8.png",
];

let kaomojiImgs = [];
for (let src of kaomojiSources) {
  const img = new Image();
  img.src = src;
  kaomojiImgs.push(img);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Shuffle helper function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function setBgMode(mode) {
  bgMode = mode;
  generateCells();
}

// Generate cells with numbers OR imgs(based on bgMode)
function generateCells() {
  cells = [];
  // Use a slight buffer to ensure no gaps at the edges during movement
  const cols = Math.ceil(canvas.width / cellSize) + 2;
  const rows = Math.ceil(canvas.height / cellSize) + 2;

  // Start the grid off-screen to create a seamless loop
  const startX = -cellSize;
  const startY = -cellSize;

  for (let r = 0; r < rows; r++) {
    let rowNums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    let rowImgs = shuffle([...kaomojiImgs]);

    for (let c = 0; c < cols; c++) {
      if (bgMode === "images") {
        cells.push({
          type: "image",
          value: rowImgs[c % rowImgs.length],
          x: startX + c * cellSize,
          y: startY + r * cellSize,
        });
      } else {
        cells.push({
          type: "number",
          value: rowNums[c % rowNums.length],
          x: startX + c * cellSize,
          y: startY + r * cellSize,
        });
      }
    }
  }
}

// Draw cells
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let cell of cells) {
    if (cell.type === "number") {
      ctx.font = "600 " + cellSize * 0.65 + "px Fredoka";
      ctx.fillStyle = "#99ccffff";
      ctx.fillText(cell.value, cell.x, cell.y);
    } else if (cell.type === "image" && cell.value.complete) {
      ctx.globalAlpha = 0.5;
      ctx.drawImage(
        cell.value,
        cell.x - cellSize / 2,
        cell.y - cellSize / 2,
        cellSize,
        cellSize
      );
    }
  }
}

// Update cells' positions
function update(timestamp) {
  if (!lastTime) lastTime = timestamp;
  const elapsed = timestamp - lastTime;

  if (elapsed > fpsInterval) {
    lastTime = timestamp - (elapsed % fpsInterval);

    for (let cell of cells) {
      cell.x += speedX;
      cell.y += speedY;

      // Wrap cells so they re-enter aligned
      if (cell.x > canvas.width + cellSize) {
        cell.x -= canvas.width + cellSize * 2.5;
      } else if (cell.x < -cellSize * 2.5) {
        cell.x += canvas.width + cellSize * 2.5;
      }

      if (cell.y > canvas.height + cellSize) {
        cell.y -= canvas.height + cellSize * 2.5;
      } else if (cell.y < -cellSize * 2.5) {
        cell.y += canvas.height + cellSize * 2.5;
      }
    }
  }
}

// Animation loop
function animate(timestamp) {
  update(timestamp);
  draw();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
setBgMode("numbers");
