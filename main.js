const canvas = document.getElementById("game");
ctx = canvas.getContext("2d");

class Snake {
  constructor(fieldDimension, field) {
    this.body = [
      {
        x: Math.round(fieldDimension.x / 2),
        y: Math.round(fieldDimension.y / 2)
      },
      {
        x: Math.round(fieldDimension.x / 2),
        y: Math.round(fieldDimension.y / 2) + 1
      },
      {
        x: Math.round(fieldDimension.x / 2),
        y: Math.round(fieldDimension.y / 2) + 2
      }
    ];
    this.head = this.body[0];
    this.direction = "up";
    this.speed = 1;
    this.field = field;
  }

  move() {
    if (this.field.gameOver) return;
    for (let i = this.body.length - 1; i >= 0; i--) {
      if (this.direction === "up") {
        if (i === 0) {
          this.body[0].y--;
          return;
        }

        this.body[i].y = this.body[i - 1].y;
        this.body[i].x = this.body[i - 1].x;
      }
      if (this.direction === "down") {
        if (i === 0) {
          this.body[0].y++;
          return;
        }

        this.body[i].y = this.body[i - 1].y;
        this.body[i].x = this.body[i - 1].x;
      }
      if (this.direction === "right") {
        if (i === 0) {
          this.body[0].x++;
          return;
        }

        this.body[i].x = this.body[i - 1].x;
        this.body[i].y = this.body[i - 1].y;
      }
      if (this.direction === "left") {
        if (i === 0) {
          this.body[0].x--;
          return;
        }

        this.body[i].x = this.body[i - 1].x;
        this.body[i].y = this.body[i - 1].y;
      }
    }
  }

  checkColision() {
    let colid = false;
    if (
      this.body[0].x < 0 ||
      this.body[0].x >= this.field.width ||
      this.body[0].y < 0 ||
      this.body[0].y >= this.field.height
    ) {
      colid = true;
    }
    this.body.forEach((member, index) => {
      if (this.head === member && index !== 0) {
        colid = true;
        console.log("colid member");
      }
    });
    return colid;
  }

  checkGetFruit() {
    this.field.apples.forEach((apple, index) => {
      if (apple.x === this.head.x && apple.y === this.head.y) {
        this.body.push({ x: null, y: null });
        this.field.apples.splice(index, 1);
      }
    });
  }

  changeDirection(newDirection) {
    const inverses = {
      up: 0,
      right: 1,
      down: 2,
      left: 3
    };
    console.log(
      inverses[this.direction],
      inverses[newDirection],
      inverses[this.direction] - inverses[newDirection]
    );
    if (Math.abs(inverses[this.direction] - inverses[newDirection]) !== 2)
      this.direction = newDirection;
  }
}

class Apple {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
  }
}

class Field {
  constructor(dimension, contextCanvas, gameOverTag) {
    this.width = dimension.x;
    this.height = dimension.y;
    this.apples = [];
    this.snake = new Snake(dimension, this);
    this.contextCanvas = contextCanvas;
    this.interval = setInterval(() => {
      this.isGameOver();
      this.snake.checkGetFruit();
      this.snake.move();
      this.render();
    }, 500);
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

    if (this.snake.checkColision()) {
      this.gameOver = true;
      this.gamerOverTag.style.visibility = "visible";
    }
  }

  render() {
    this.contextCanvas.clearRect(0, 0, this.width, this.height);

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
  const gameOverMsg = document.getElementById("game-over");
  const field = new Field({ x: 50, y: 50 }, ctx, gameOverMsg);
  console.log(field);
  field.addApple();
  field.render();
  keyInput(field.snake);
  console.log(field);
}
main();
