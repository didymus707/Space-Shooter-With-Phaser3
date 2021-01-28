import Entity from '../Entity';

export default class AlienLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'shot2');
    this.body.velocity.x -= 300;
  }
}