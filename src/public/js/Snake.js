export default class Snake {
  constructor(fieldDimension, game) {
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
    this._lastDirection = "up";
    this.movementSpeed = 500;
    this.game = game;
  }

  move() {
    // if (this.field.gameOver) return;
    if (!this.checkNewDirection(this.direction))
      this.direction = this._lastDirection;
    else this._lastDirection = this.direction;

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

  checkCollision() {
    let collided = false;
    if (
      this.body[0].x < 0 ||
      this.body[0].x >= this.game.width ||
      this.body[0].y < 0 ||
      this.body[0].y >= this.game.height
    ) {
      collided = true;
    }
    this.body.forEach((member, index) => {
      if (this.head.x == member.x && this.head.y == member.y && index !== 0) {
        collided = true;
      }
    });
    return collided;
  }

  checkGetFruit() {
    this.game.apples.forEach((apple, index) => {
      if (apple.x === this.head.x && apple.y === this.head.y) {
        this.body.push({ x: -1, y: -1 });
        this.game.apples.splice(index, 1);
        if ((this.body.length - 3) % 3 === 0) {
          this.game.level = (this.body.length - 3) / 3 + 1;
        }
        if (this.game.level < 2) {
          this.movementSpeed -= 100;
          this.game.generateAppleSpeed -= 200;
        }
        if (this.game.level >= 2 && this.game.level < 3) {
          this.movementSpeed -= 20;
          this.game.generateAppleSpeed -= 100;
        }
        if (this.game.level >= 3 && this.movementSpeed >= 100) {
          this.movementSpeed -= 10;
        }
        if (this.game.level >= 3 && this.game.generateAppleSpeed >= 1000)
          this.game.generateAppleSpeed -= 80;
      }
    });
  }

  changeDirection(newDirection) {
    if (this.checkNewDirection(newDirection)) this.direction = newDirection;
  }

  checkNewDirection(newDirection) {
    const inverses = {
      up: 0,
      right: 1,
      down: 2,
      left: 3
    };

    return (
      Math.abs(inverses[this._lastDirection] - inverses[newDirection]) !== 2
    );
  }
}
