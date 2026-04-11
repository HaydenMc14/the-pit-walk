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
let segmentIndex = Math.floor(position % track.length);
let segment = track[segmentIndex];

let gripFactor = segment.grip;

playerX += steering * 0.05 * gripFactor;

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
playerX -= segment.curve * speed * (2 - gripFactor);
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
baseX += segment.curve * 20 + segment.tilt * 10;

let elevationOffset = segment.elevation * 200;
let y = canvas.height - i * 15 + elevationOffset;
let width = 400 * segment.width * (1 - i / 50);

drawRoad(baseX - camX, y, width, segment, i);
  }

  drawCar();
}

// ============================================
// DRAW ROAD STRIP
// ============================================

function drawRoad(x, y, width, segment, index) {
  let rumble = width * segment.rumbleWidth;

  // Make rumble BIGGER and more visible
  rumble = Math.max(rumble, 12);

  // Alternate rumble color
  let rumbleColor = (Math.floor(index / segment.rumbleLength) % 2)
    ? "#ff0000"
    : "#ffffff"

  // ROAD FIRST
  ctx.fillStyle = "#555";
  ctx.fillRect(x - width / 2, y, width, 12);

  // LEFT RUMBLE
  ctx.fillStyle = rumbleColor;
  ctx.fillRect(x - width / 2 - rumble, y, rumble, 12);

  // RIGHT RUMBLE
  ctx.fillRect(x + width / 2, y, rumble, 12);

  // GRASS
ctx.fillStyle = "green";
ctx.fillRect(x - width / 2 - rumble - 20, y, 20, 12);
ctx.fillRect(x + width / 2 + rumble, y, 20, 12);
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
