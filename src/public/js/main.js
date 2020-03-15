import Game from "./Game.js";

function keyInput(snake) {
  window.addEventListener("keydown", e => {
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
  const game = new Game({ x: 25, y: 25 }, ctx, gameOverMsg);
  // game.addApple();

  keyInput(game.snake);
  window.requestAnimationFrame(loop);

  let lastMovementTime = 0;
  let lastAddAppleTime = 0;
  let lastRender = 0;

  function loop(currentTime) {
    if (currentTime >= lastRender + 20) {
      if (currentTime >= lastMovementTime + game.snake.movementSpeed) {
        game.snake.move();
        console.log("current time: " + currentTime);
        console.log(
          `Level = ${game.level}, Length = ${game.snake.body.length}, SnakeDelayRender = ${game.snake.movementSpeed}, appleSpeed = ${game.generateAppleSpeed}`
        );
        lastMovementTime = currentTime;
      }

      if (currentTime >= lastAddAppleTime + game.generateAppleSpeed) {
        game.addApple();
        lastAddAppleTime = currentTime;
      }
      game.isGameOver();
      game.snake.checkGetFruit();
      game.render();
      if (!game.gameOver) window.requestAnimationFrame(loop);
    }
  }
}
main();
