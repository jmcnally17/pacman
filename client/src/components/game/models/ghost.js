export default class Ghost {
  constructor({ position, velocity, colour }, tileLength) {
    this.originalPosition = position;
    this.position = { ...this.originalPosition };
    this.originalVelocity = velocity;
    this.velocity = { ...this.originalVelocity };
    this.tileLength = tileLength;
    this.radius = (this.tileLength * 3) / 8;
    this.colour = colour;
    this.prevCollisions = [];
    this.speed = this.tileLength / 8;
    this.isScared = false;
    this.isHunting = false;
    this.isRetreating = false;
    this.retreatingTimer = null;
    this.image = new Image();
    this.up = new Image();
    this.up.src = `./images/${this.colour}GhostUp.png`;
    this.left = new Image();
    this.left.src = `./images/${this.colour}GhostLeft.png`;
    this.right = new Image();
    this.right.src = `./images/${this.colour}GhostRight.png`;
    this.down = new Image();
    this.down.src = `./images/${this.colour}GhostDown.png`;
    this.scaredBlue = new Image();
    this.scaredBlue.src = `./images/scaredGhostBlue.png`;
    this.eyesUp = new Image();
    this.eyesUp.src = `./images/eyesUp.png`;
    this.eyesLeft = new Image();
    this.eyesLeft.src = `./images/eyesLeft.png`;
    this.eyesRight = new Image();
    this.eyesRight.src = `./images/eyesRight.png`;
    this.eyesDown = new Image();
    this.eyesDown.src = `./images/eyesDown.png`;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x - this.radius * 2,
      this.position.y - this.radius * 2
    );
  }

  update(ctx) {
    this.assignSprite();
    this.draw(ctx);
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  changeScaredState() {
    this.isScared = this.isScared ? false : true;
  }

  changeHuntingState() {
    this.isHunting = this.isHunting ? false : true;
  }

  changeRetreatingState() {
    this.isRetreating = this.isRetreating ? false : true;
  }

  reset() {
    this.position = { ...this.originalPosition };
    this.velocity = { ...this.originalVelocity };
    this.speed = this.tileLength / 8;
    this.prevCollisions = [];
    this.#resetStates();
  }

  assignSprite() {
    if (this.isRetreating) this.#assignRetreatingSprite();
    else if (this.isScared) this.#assignScaredSprite();
    else this.#assignRegularSprite();
  }

  // private

  #resetStates() {
    if (this.isScared) this.changeScaredState();
    if (this.isHunting) this.changeHuntingState();
    this.retreatingTimer.reset();
    if (this.isRetreating) this.changeRetreatingState();
  }

  #assignRetreatingSprite() {
    if (this.velocity.y < 0) this.image = this.eyesUp;
    else if (this.velocity.x < 0) this.image = this.eyesLeft;
    else if (this.velocity.x > 0) this.image = this.eyesRight;
    else if (this.velocity.y > 0) this.image = this.eyesDown;
  }

  #assignScaredSprite() {
    this.image = this.scaredBlue;
  }

  #assignRegularSprite() {
    if (this.velocity.y < 0) this.image = this.up;
    else if (this.velocity.x < 0) this.image = this.left;
    else if (this.velocity.x > 0) this.image = this.right;
    else if (this.velocity.y > 0) this.image = this.down;
  }
}
