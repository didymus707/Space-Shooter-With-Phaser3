import Phaser from 'phaser';
import Entity from './Entity';

export default class BossShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'boss', 'BossShip');
    this.body.velocity.x -= Phaser.Math.Between(50, 100);
  }
}