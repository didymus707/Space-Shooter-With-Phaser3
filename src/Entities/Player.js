import Phaser from 'phaser';
import config from '../config/config';
import Entity from './Entity';

export default class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player');
    this.setData('speed', 200);
    this.play('player');
  }

  moveUp() {
    this.body.velocity.y = -this.getData('speed');
  }

  moveDown() {
    this.body.velocity.y = this.getData('speed');
  }

  moveLeft() {
    this.body.velocity.x = -this.getData('speed');
  }

  moveRight() {
    this.body.velocity.x = this.getData('speed');
  }

  constantSpeed() {
    this.body.setVelocityX(10);
  }

  resetShipPos() {
    this.body.x = 0;
    const randomY = Phaser.Math.Between(0, config.height);
    this.body.y = randomY;
  }

  update() {
    // this.body.setVelocity(1, 0);
    this.body.setCollideWorldBounds(true);

    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);
  }
}