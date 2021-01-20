import Entity from '../Entity';

export default class BossLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'shotbig');
    this.body.velocity.x -= 400;
  }
}