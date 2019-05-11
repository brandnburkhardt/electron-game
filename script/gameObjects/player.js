class Player {
  constructor(x, y) {
    this.score = 0;
    this.x = x;
    this.y = y;
    this.dir = 1;
    this.tongue = {
      length: 0,
      active: null,
      frame: 0,
    },
    this.ribbit = {
      cooldown: 0,
      x: null,
      y: null,
    };
  }

  update(dt, keys) {

  }

  draw(renderer) {

  }
}

module.exports = Player;