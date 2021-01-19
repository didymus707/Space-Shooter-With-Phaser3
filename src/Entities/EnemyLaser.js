import Phaser from 'phaser';
import Entity from './Entity';

export default class EnemyLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'laser');
    this.body.velocity.x = 200;
  }
}