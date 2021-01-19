import Phaser from 'phaser';
import Entity from './Entity';

export default class KillerShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy1', 'KillerShip');
    this.body.velocity.x = Phaser.Math.Between(50, 100);
  }
}