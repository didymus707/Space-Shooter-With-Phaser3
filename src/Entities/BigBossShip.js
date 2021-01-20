import Phaser from 'phaser';
import Entity from './Entity';

export default class BigBossShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'bigBoss', 'BigBossShip');
    this.body.velocity.x -= Phaser.Math.Between(50, 100);
  }
}