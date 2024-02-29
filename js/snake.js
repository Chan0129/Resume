const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;
let isPaused = false;
let gameLoop;
let obstacles = [];

const scoreDisplay = document.getElementById("score");

document.addEventListener("keydown", handleKeyDown);

function handleKeyDown(event) {
  const keyPressed = event.key;
  if (keyPressed === "ArrowUp" && dy !== 1) {
    dx = 0;
    dy = -1;
  } else if (keyPressed === "ArrowDown" && dy !== -1) {
    dx = 0;
    dy = 1;
  } else if (keyPressed === "ArrowLeft" && dx !== 1) {
    dx = -1;
    dy = 0;
  } else if (keyPressed === "ArrowRight" && dx !== -1) {
    dx = 1;
    dy = 0;
  } else if (keyPressed === " ") {
    togglePause();
  }
}

function togglePause() {
  isPaused = !isPaused;
  if (isPaused) {
    clearInterval(gameLoop);
  } else {
    gameLoop = setInterval(draw, 100);
  }
}

function drawSnake() {
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? "darkgreen" : "green";
    ctx.beginPath();
    ctx.arc(
      segment.x * box + box / 2,
      segment.y * box + box / 2,
      box / 2,
      0,
      2 * Math.PI
    );
    ctx.fill();
  });
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * box, food.y * box, box, box);
}

function drawObstacles() {
  ctx.fillStyle = "gray";
  obstacles.forEach((obstacle) => {
    ctx.fillRect(obstacle.x * box, obstacle.y * box, box, box);
  });
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    createFood();
    score += 10;
    scoreDisplay.textContent = score;
  } else {
    snake.pop();
  }

  // Game over if snake hits canvas borders or obstacles
  if (
    head.x < 0 ||
    head.x >= canvas.width / box ||
    head.y < 0 ||
    head.y >= canvas.height / box ||
    checkCollision(head, obstacles)
  ) {
    clearInterval(gameLoop);
    alert("Game Over! Your score: " + score);
  }
}

function createFood() {
  food.x = Math.floor(Math.random() * (canvas.width / box));
  food.y = Math.floor(Math.random() * (canvas.height / box));
}

function createObstacles() {
  obstacles = [];
  const numObstacles = Math.floor(Math.random() * 6) + 5; // Generate between 5 to 10 obstacles
  for (let i = 0; i < numObstacles; i++) {
    let obstacle = {
      x: Math.floor(Math.random() * (canvas.width / box)),
      y: Math.floor(Math.random() * (canvas.height / box)),
    };
    if (
      !isColliding(obstacle, snake) &&
      !isColliding(obstacle, [food, ...obstacles])
    ) {
      obstacles.push(obstacle);
    }
  }
}

function isColliding(point, elements) {
  return elements.some(
    (element) => element.x === point.x && element.y === point.y
  );
}

function checkCollision(point, elements) {
  return elements.some(
    (element) => point.x === element.x && point.y === element.y
  );
}

function draw() {
  if (!isPaused) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    drawObstacles();
    moveSnake();
  }
}

createObstacles(); // Generate obstacles initially
gameLoop = setInterval(draw, 100);
