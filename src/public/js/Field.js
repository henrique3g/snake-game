import Apple from "./Apple.js";
import Snake from "./Snake.js";

export default class Field {
  constructor(dimension, contextCanvas, gameOverTag) {
    this.width = dimension.x;
    this.height = dimension.y;
    this.apples = [];
    this.snake = new Snake(dimension, this);
    this.contextCanvas = contextCanvas;
    this.appleSpeed = 1;

    this.interval = setInterval(() => {
      this.isGameOver();
      this.snake.checkGetFruit();
      this.snake.move();
      this.render();
    }, 100);
    this.intervalGenerateFruits = setInterval(() => {
      this.addApple();
    }, 1000);

    this.gameOver = false;
    this.gamerOverTag = gameOverTag;
  }

  isGameOver() {
    /* if (
		this.snake.body[0].x < 0 ||
		this.snake.body[0].x >= this.width ||
		this.snake.body[0].y < 0 ||
		this.snake.body[0].y >= this.height
	  ) */

    if (this.snake.checkCollision()) {
      this.gameOver = true;
      this.gamerOverTag.style.visibility = "visible";
    }
  }

  render() {
    this.contextCanvas.clearRect(0, 0, this.width, this.height);

    this.contextCanvas.drawImage(this.apples[0].img, 10, 10, 1, 1);

    this.contextCanvas.fillStyle = "#f00";
    this.apples.forEach(apple => {
      this.contextCanvas.fillRect(apple.x, apple.y, 1, 1);
    });

    this.contextCanvas.fillStyle = "#00f000";
    this.snake.body.forEach(member => {
      this.contextCanvas.fillRect(member.x, member.y, 1, 1);
    });
  }

  addApple() {
    const x = Math.round(Math.random() * 50);
    const y = Math.round(Math.random() * 50);
    this.apples.push(new Apple({ x, y }));
  }
}
