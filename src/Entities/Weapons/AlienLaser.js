import Entity from '../Entity';

export default class AlienLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'shotoval');
    this.body.velocity.x -= 300;
  }
}