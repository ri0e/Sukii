// Set up canvas
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

const cellSize = 100;
const speedX = -0.7;
const speedY = 1.4;

let cells = [];
let lastTime = 0;
const fpsInterval = 1000 / 60;
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  generateCells();
}

// Resize canvas function (need fix)
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Generate cells with numbers
function generateCells() {
  cells = [];
  const cols = Math.ceil(canvas.width / cellSize) + 4;
  const rows = Math.ceil(canvas.height / cellSize) + 4;
  const startX = -2 * cellSize;
  const startY = -2 * cellSize;

  for (let r = 0; r < rows; r++) {
    let rowNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    shuffle(rowNums);
    for (let c = 0; c < cols; c++) {
      cells.push({
        num: rowNums[c % rowNums.length],
        x: startX + c * cellSize,
        y: startY + r * cellSize,
        color: "hsla(210, 100%, 80%, 1.00)",
      });
    }
  }
}

// Draw cells
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "bold " + cellSize * 0.65 + "px Fredoka";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let cell of cells) {
    ctx.fillStyle = cell.color;
    ctx.fillText(cell.num, cell.x, cell.y);
  }
}

// Update cell positions
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
        cell.x -= canvas.width + cellSize * 4;
      } else if (cell.x < -cellSize * 4) {
        cell.x += canvas.width + cellSize * 4;
      }

      if (cell.y > canvas.height + cellSize) {
        cell.y -= canvas.height + cellSize * 4;
      } else if (cell.y < -cellSize * 4) {
        cell.y += canvas.height + cellSize * 4;
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
