var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ===== GAME VARIABLES =====
var speed = 0;
var position = 0;
var playerX = 0;
var maxSpeed = 200;

var keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

// ===== ROAD =====
var segments = [];

for (var i = 0; i < 500; i++) {
  segments.push({
    curve: Math.sin(i * 0.05) * 2
  });
}

// ===== UPDATE =====
function update(dt) {

  if (keys["ArrowUp"]) speed += 2;
  if (keys["ArrowDown"]) speed -= 3;

  speed = Util.limit(speed, 0, maxSpeed);

  if (keys["ArrowLeft"]) playerX -= 0.05;
  if (keys["ArrowRight"]) playerX += 0.05;

  if (Math.abs(playerX) > 1) speed *= 0.95;

  position += speed * dt;
}

// ===== DRAW =====
function draw() {

  ctx.fillStyle = "#4da6ff";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  var base = Math.floor(position) % segments.length;
  var x = 0;

  for (var i = 0; i < 100; i++) {

    var seg = segments[(base + i) % segments.length];
    var scale = 1 - i / 100;

    var width = canvas.width * scale * 0.8;
    var y = canvas.height - i * 8;

    x += seg.curve * 0.5;

    ctx.fillStyle = (i % 2 === 0) ? "#444" : "#555";

    ctx.fillRect(
      canvas.width/2 - width/2 + x * 50,
      y,
      width,
      8
    );
  }

  // CAR
  ctx.fillStyle = "#ffd100";
  ctx.fillRect(canvas.width/2 - 20 + playerX*200, canvas.height - 80, 40, 60);

  // SPEED
  ctx.fillStyle = "#000";
  ctx.fillRect(canvas.width - 180, canvas.height - 80, 160, 60);

  ctx.fillStyle = "#ffd100";
  ctx.font = "20px Arial";
  ctx.textAlign = "right";
  ctx.fillText(Math.floor(speed) + " km/h", canvas.width - 30, canvas.height - 40);
}

// ===== GAME LOOP =====
var last = Util.timestamp();

function frame() {
  var now = Util.timestamp();
  var dt = (now - last) / 1000;
  last = now;

  update(dt);
  draw();

  requestAnimationFrame(frame);
}

frame();
