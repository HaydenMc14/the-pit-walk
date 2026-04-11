// ============================================
// SETUP
// ============================================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ============================================
// PLAYER STATE
// ============================================

let position = 0;
let speed = 0.5;

let playerX = 0;       // -1 (left) to +1 (right)
let steering = 0;      // current steering input

// ============================================
// INPUT
// ============================================

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") steering = -1;
  if (e.key === "ArrowRight") steering = 1;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft" && steering === -1) steering = 0;
  if (e.key === "ArrowRight" && steering === 1) steering = 0;
});

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

  // --------------------------------
  // STEERING CONTROL
  // --------------------------------
  playerX += steering * 0.03;

  // Clamp so player can't go too far off road
  playerX = Math.max(-2, Math.min(2, playerX));

  // --------------------------------
  // CURRENT SEGMENT
  // --------------------------------
  let segmentIndex = Math.floor(position % track.length);
  let segment = track[segmentIndex];

  // --------------------------------
  // CURVE EFFECT ON PLAYER
  // This is the magic "cornering feel"
  // --------------------------------
  playerX -= segment.curve * speed * 0.5;
}

// ============================================
// RENDER ROAD
// ============================================

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let baseX = canvas.width / 2;
  let camX = playerX * 200; // camera follows player

  for (let i = 0; i < 50; i++) {
    let segmentIndex = Math.floor((position + i) % track.length);
    let segment = track[segmentIndex];

    // Curve accumulation (world bending)
    baseX += segment.curve * 20;

    let y = canvas.height - i * 15;
    let width = 200 * (1 - i / 50);

    drawRoad(baseX - camX, y, width);
  }

  drawCar();
}

// ============================================
// DRAW ROAD STRIP
// ============================================

function drawRoad(x, y, width) {
  ctx.fillStyle = "#555";
  ctx.fillRect(x - width / 2, y, width, 10);
}

// ============================================
// DRAW CAR
// ============================================

function drawCar() {
  ctx.fillStyle = "red";

  // Draw slightly higher so it's clearly visible
  ctx.fillRect(
    canvas.width / 2 - 25,
    canvas.height - 120,
    50,
    60
  );
}

// ============================================
// START GAME
// ============================================

gameLoop();
