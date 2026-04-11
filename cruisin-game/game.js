// ============================================
// SETUP
// ============================================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let position = 0;
let speed = 0.5;

// ============================================
// MAIN LOOP
// ============================================

function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

// ============================================
// UPDATE
// ============================================

function update() {
  position += speed;
}

// ============================================
// RENDER ROAD
// ============================================

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let baseX = canvas.width / 2;

  for (let i = 0; i < 50; i++) {
    let segmentIndex = Math.floor((position + i) % track.length);
    let segment = track[segmentIndex];

    // Curve effect (world rotates)
    baseX += segment.curve * 5;

    let y = canvas.height - i * 15;
    let width = 200 * (1 - i / 50);

    drawRoad(baseX, y, width);
  }
}

// ============================================
// DRAW ROAD STRIP
// ============================================

function drawRoad(x, y, width) {
  ctx.fillStyle = "#555";
  ctx.fillRect(x - width / 2, y, width, 10);
}

// ============================================
// START GAME
// ============================================

gameLoop();
