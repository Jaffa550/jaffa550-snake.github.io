const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

// Snake object
let snake = {
    x: 10,
    y: 10,
    xSpeed: 1 * scale,
    ySpeed: 0,
    tail: [],
    length: 1
};

// Food object
let food = {
    x: Math.floor(Math.random() * columns) * scale,
    y: Math.floor(Math.random() * rows) * scale
};

// Main game loop
function gameLoop() {
    update();
    draw();
}

// Update snake position and check for collisions
function update() {
    // Move the snake
    snake.x += snake.xSpeed;
    snake.y += snake.ySpeed;

    // Wrap snake around canvas (optional, or you can implement collision with walls)
    if (snake.x >= canvas.width) snake.x = 0;
    if (snake.y >= canvas.height) snake.y = 0;
    if (snake.x < 0) snake.x = canvas.width - scale;
    if (snake.y < 0) snake.y = canvas.height - scale;

    // Check if snake eats the food
    if (snake.x === food.x && snake.y === food.y) {
        snake.length++;
        food = {
            x: Math.floor(Math.random() * columns) * scale,
            y: Math.floor(Math.random() * rows) * scale
        };
    }

    // Keep track of the snake's tail
    snake.tail.push({ x: snake.x, y: snake.y });
    if (snake.tail.length > snake.length) {
        snake.tail.shift();
    }

    // Check if snake collides with itself
    for (let i = 0; i < snake.tail.length - 1; i++) {
        if (snake.x === snake.tail[i].x && snake.y === snake.tail[i].y) {
            resetGame();
        }
    }
}

// Draw snake and food on the canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, scale, scale);

    // Draw the snake
    ctx.fillStyle = 'green';
    snake.tail.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, scale, scale);
    });
}

// Reset the game when the snake collides with itself
function resetGame() {
    snake.x = 10;
    snake.y = 10;
    snake.xSpeed = 1 * scale;
    snake.ySpeed = 0;
    snake.tail = [];
    snake.length = 1;
}

// Handle keyboard input for snake direction
window.addEventListener('keydown', evt => {
    switch (evt.key) {
        case 'ArrowUp':
            if (snake.ySpeed === 0) {
                snake.xSpeed = 0;
                snake.ySpeed = -1 * scale;
            }
            break;
        case 'ArrowDown':
            if (snake.ySpeed === 0) {
                snake.xSpeed = 0;
                snake.ySpeed = 1 * scale;
            }
            break;
        case 'ArrowLeft':
            if (snake.xSpeed === 0) {
                snake.xSpeed = -1 * scale;
                snake.ySpeed = 0;
            }
            break;
        case 'ArrowRight':
            if (snake.xSpeed === 0) {
                snake.xSpeed = 1 * scale;
                snake.ySpeed = 0;
            }
            break;
    }
});

// Start the game loop
setInterval(gameLoop, 100);
