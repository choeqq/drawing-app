const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const sizeElement = document.getElementById("size");
const incrementBtn = document.getElementById("increment");
const decrementBtn = document.getElementById("decrement");
const clearBtn = document.getElementById("clearBtn");
const colorChangeBtn = document.getElementById("colorInput");
const input = document.getElementById("input");

let size = 20;
let isPressed = false;

let startX = undefined;
let startY = undefined;
let finishX = undefined;
let finishY = undefined;

function drawCircle(x, y, size) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, 2 * Math.PI);
  ctx.fill();
}

function drawLine(startX, startY, finishX, finishY) {
  let color = input.value;

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(finishX, finishY);
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.lineWidth = size;
}

canvas.addEventListener("mousedown", (e) => {
  isPressed = true;

  startX = e.offsetX;
  startY = e.offsetY;
});
canvas.addEventListener("mouseup", (e) => {
  isPressed = false;

  finishX = e.offsetX;
  finishY = e.offsetY;
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    finishX = e.offsetX;
    finishY = e.offsetY;

    drawCircle(finishX, finishY, size);
    drawLine(startX, startY, finishX, finishY);

    startX = finishX;
    startY = finishY;
  }
});

function updateSize() {
  sizeElement.textContent = size;
}

updateSize();

function incrementSize() {
  if (size < 80) {
    size += 2;
  } else {
    size = 80;
  }
  updateSize();
}
function decrementSize() {
  if (size > 2) {
    size -= 2;
  } else {
    size = 2;
  }
  updateSize();
}

colorChangeBtn.addEventListener("input", () => {
  let color = input.value;
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
});

incrementBtn.addEventListener("click", incrementSize);
decrementBtn.addEventListener("click", decrementSize);

clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
