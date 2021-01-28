import Phaser from 'phaser';
import two from '../assets/Ships/2.png';
import four from '../assets/Ships/4.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('two', two);
    this.load.image('four', four);
  }

  create() {
    this.scene.start('Preloader');
  }
}