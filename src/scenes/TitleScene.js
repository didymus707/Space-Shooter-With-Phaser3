import Phaser from 'phaser';
import config from '../config/config';
import Button from '../Objects/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown'),
    };
    this.add.image(400, 300, 'bg1');
    this.cameras.main.fadeIn(500, 0, 0, 0);

    // Game
    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 100, 'normal', 'hover', 'pressed', 'Play', 'Game', this.sfx.btnOver);

    // Options
    this.optionsButton = new Button(this, config.width / 2, config.height / 2, 'normal', 'hover', 'pressed', 'Options', 'Options', this.sfx.btnOver);

    // Credits
    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 100, 'normal', 'hover', 'pressed', 'Credits', 'Credits', this.sfx.btnOver);

    // startting the music
    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}