import Entity from '../Entity';

export default class KillerLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'shotwave');
    this.body.velocity.x -= 500;
  }
}