import Entity from '../Entity';

export default class BoatLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'shotsmall');
    this.body.velocity.x -= 85;
  }
}