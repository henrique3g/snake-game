import Apple from "./Apple.js";
import Snake from "./Snake.js";

export default class Game {
  constructor(dimension, contextCanvas, gameOverTag) {
    this.width = dimension.x;
    this.height = dimension.y;
    this.apples = [];
    this.snake = new Snake(dimension, this);
    this.contextCanvas = contextCanvas;
    this.level = 1;
    this.generateAppleSpeed = 2000;
    this.gameOver = false;
    this.gamerOverTag = gameOverTag;
  }

  isGameOver() {
    if (this.snake.checkCollision()) {
      this.gameOver = true;
      this.gamerOverTag.style.visibility = "visible";
    }
  }

  render() {
    this.contextCanvas.clearRect(0, 0, this.width, this.height);

    // this.contextCanvas.drawImage(this.apples[0].img, 0, 0, 25, 25);

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
    if (this.apples.length >= 15) return;
    const x = Math.round(Math.random() * this.width);
    const y = Math.round(Math.random() * this.height);
    this.apples.push(new Apple({ x, y }));
  }
}
