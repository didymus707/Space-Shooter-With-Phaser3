import Phaser from 'phaser';
import Entity from './Entity';

export default class AlienShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy1', 'AlienShip');
    this.body.velocity.x = Phaser.Math.Between(50, 100);
  }
}