import Field from "./Field.js";

function keyInput(snake) {
  addEventListener("keydown", e => {
    if (e.key === "ArrowUp") {
      snake.direction = "up";
    }
    if (e.key === "ArrowDown") {
      snake.direction = "down";
    }
    if (e.key === "ArrowLeft") {
      snake.direction = "left";
    }
    if (e.key === "ArrowRight") {
      snake.direction = "right";
    }
  });
}

function main() {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");

  const gameOverMsg = document.getElementById("game-over");
  const field = new Field({ x: 50, y: 50 }, ctx, gameOverMsg);

  field.addApple();
  field.render();
  keyInput(field.snake);

  while (!field.gameOver) {}
}
main();
