const { scaleLinear } = require('./scale')

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const a = 2 * Math.PI / 6;
const r = 50;

let grid = []
let frameGrid = []

window.addEventListener('resize', init);
const fps = 60;
let stop = false;
let frameCount = 0;
let fpsInterval, startTime, now, then, elapsed;


function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = window.performance.now();
  startTime = then;
  animate();
}
function animate(newtime) {
  // stop
  if (stop) {
      return;
  }
  // request another frame
  requestAnimationFrame(animate);
  // calc elapsed time since last loop
  now = newtime;
  elapsed = now - then;
  // if enough time has elapsed, draw the next frame
  if (elapsed > fpsInterval) {
      // Get ready for next frame by setting then=now, but...
      // Also, adjust for fpsInterval not being multiple of 16.67
      then = now - (elapsed % fpsInterval);
      // draw stuff here
      frameCount++;
      animateGrid(frameCount)
      if (frameCount >= fps) {
        frameCount = 0;
      }
  }
}




const offset = 1
function animateGrid(frame) {
  if (!grid.length) {
    return
  }
  console.log(frame)

  // frameGrid = []
  drawGrid(grid, frame)
}

function init() {
  const height = window.innerHeight
  const width = window.innerWidth
  canvas.width = width;
  canvas.height = height;
  console.log(width, height);
  grid = getGridPoints(width, height);
  drawGrid(grid)
}

const maxRadius = 50
const seed = (min, max) => () => randomIntFromInterval(min, max)
const seeder = seed(1, fps)

const radiusStep = scaleLinear({ domain: [1, maxRadius], range: [1, 50 + fps] })

function getGridPoints(width, height) {
  const grid = []
  for (let y = r; y + r * Math.sin(a) < height; y += r * Math.sin(a)) {
    const row = []
    for (let x = r, j = 0; x + r * (1 + Math.cos(a)) < width; x += r * (1 + Math.cos(a)), y += (-1) ** j++ * r * Math.sin(a)) {
      row.push({
        center: { x, y },
        points: getHexPoints(x, y),
        seed: seeder()
      })
    }
    grid.push(row)
  }
  return grid;
}

function getHexPoints(x, y) {
  const points = [];
  // ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const point = {
      x: x + r * Math.cos(a * i),
      y: y + r * Math.sin(a * i)
    }
    points.push(point);
  }
  return points
}

function drawGrid(grid, frame = 0) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(const column of grid) {
    for(const hex of column) {
      drawHex(hex)
      drawCircle(
        hex.center.x,
        hex.center.y,
        radiusStep(hex.seed + frame)
      )
    }
  }
}

function drawHex(hex) {
  ctx.beginPath();
  ctx.moveTo(hex.points[0].x, hex.points[0].y);
  for (let i = 1; i < hex.points.length; i++) {
    ctx.lineTo(hex.points[i].x, hex.points[i].y);
  }
  ctx.closePath();
  ctx.stroke();
}

function drawCircle(x, y, rad) {
  ctx.beginPath();
  ctx.arc(x, y, rad, 0, 2 * Math.PI);
  ctx.stroke();
}

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}


init();
startAnimating(fps)
