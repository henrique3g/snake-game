export default class Apple {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = "../assets/apple.bmp";
  }
}
