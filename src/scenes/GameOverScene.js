import Phaser from 'phaser';
import config from '../config/config';
import ScrollingBackground from '../utilities/ScrollingBackground';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    this.add.text(config.width / 2, config.height / 2, 'Game Over');
    this.gameBackgrounds = ['bg2', 'bg3', 'bg4'];
    this.backgrounds = [];
    for (let i = 0; i < 3; i += 1) {
      const bg = new ScrollingBackground(this, this.gameBackgrounds[i], i * 10);
      this.backgrounds.push(bg);
    }
  }
}