export default class Snake {
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

  checkCollision() {
    let collided = false;
    if (
      this.body[0].x < 0 ||
      this.body[0].x >= this.field.width ||
      this.body[0].y < 0 ||
      this.body[0].y >= this.field.height
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
