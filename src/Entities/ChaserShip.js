import Phaser from 'phaser';
import Entity from './Entity';

export default class ChaserShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy1', 'ChaserShip');
    this.body.velocity.x = Phaser.Math.Between(50, 100);
  }
}