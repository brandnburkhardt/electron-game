const { GAME_HEIGHT, GAME_WIDTH } = require('../constants');

const FLY_SPEED = 5;
const FLY_SIZE = 12;
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

  update(fly, player) {
    if (fly.trapped) {
      const { x, y, dir, tongue } = player;
      fly.x = x + dir * (tongue.length * Math.cos(-Math.PI / 4)) + dir * 33;
      fly.y = y + (tongue.length * Math.sin(-Math.PI / 4)) - 23;
    } else if (fly.target) {
      const diffX = Math.abs(fly.x - fly.target.x);
      const diffY = Math.abs(fly.y - fly.target.y);
      if (diffX <= FLY_SPEED && diffY <= FLY_SPEED) {
        fly.target = {
          x: Math.random() * GAME_WIDTH,
          y: Math.random() * GAME_HEIGHT,
        };
      }

      const angle = Math.atan2(fly.target.y - fly.y, fly.target.x - fly.x);
      fly.x += FLY_SPEED * Math.cos(angle);
      fly.y += FLY_SPEED * Math.sin(angle);
    }
  }

  draw(renderer) {

  }
}

module.exports = Fly;