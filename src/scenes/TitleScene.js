import Phaser from 'phaser';
import config from '../config/config';
import Button from '../Objects/Button';
import ScrollingBackground from '../utilities/ScrollingBackground';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown'),
    };

    this.cameras.main.fadeIn(500, 0, 0, 0);

    this.title = this.add.text(this.game.config.width * 0.5, 64, 'Earth Defenders', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.title.setOrigin(0.5);

    this.add.text(2, this.game.config.height - 2,
      'Game Controls\nMove with directional Keys \nShoot with the Spacebar\n')
      .setOrigin(0, 1);

    this.gameBackgrounds = ['bg4', 'bg3', 'bg2', 'bg5', 'bg6', 'bg7'];
    this.backgrounds = [];
    for (let i = 0; i < 7; i += 1) {
      const bg = new ScrollingBackground(this, this.gameBackgrounds[i], i * 10);
      this.backgrounds.push(bg);
    }

    // Game
    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 100, 'normal', 'hover', 'pressed', 'Play', 'PlayerName', this.sfx.btnOver, this.sfx.btnDown);

    // Highscore
    this.highscoreButton = new Button(this, config.width / 2, config.height / 2, 'normal', 'hover', 'pressed', 'Highscore', 'Highscore', this.sfx.btnOver);

    // Options
    this.optionsButton = new Button(this, config.width / 2, config.height / 2 + 100, 'normal', 'hover', 'pressed', 'Options', 'Options', this.sfx.btnOver, this.sfx.btnDown);

    // Credits
    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 200, 'normal', 'hover', 'pressed', 'Credits', 'Credits', this.sfx.btnOver, this.sfx.btnDown);

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