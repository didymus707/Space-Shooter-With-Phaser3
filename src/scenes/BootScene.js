import Phaser from 'phaser';
import zenva from '../assets/zenva_logo.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('zenva', zenva);
  }

  create() {
    this.scene.start('Preloader');
  }
}