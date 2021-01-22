import Phaser from 'phaser';
import config from '../config/config';
import ScrollingBackground from '../utilities/ScrollingBackground';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    this.add.text(config.width / 2, config.height / 2, 'Game Over');
    this.gameBackgrounds = ['bg', 'bg1', 'bg2', 'bg3', 'bg4', 'bg5', 'bg6', 'bg7'];
    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const bg = new ScrollingBackground(this, this.gameBackgrounds[i], i * 10);
      this.backgrounds.push(bg);
    }
  }

  update() {
    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }
  }
}