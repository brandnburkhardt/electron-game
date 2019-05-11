const { GAME_HEIGHT, GAME_WIDTH } = require('../constants');
class Fly {
  constructor() {
    this.x = Math.random() * GAME_WIDTH;
    this.y = Math.random() * GAME_HEIGHT;
    this.target = {
      x: Math.random() * GAME_WIDTH,
      y: Math.random() * GAME_HEIGHT,
    };
    this.trapped = false;
  }

  update(dt, keys) {

  }

  draw(renderer) {

  }
}

module.exports = Fly;