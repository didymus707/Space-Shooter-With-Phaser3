import Phaser from 'phaser';
import config from '../config/config';
import Button from '../Objects/Button';
import ScrollingBackground from '../utilities/ScrollingBackground';
import { postScores } from '../ScoreApi';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    this.model = this.sys.game.globals.model;

    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown'),
    };

    this.cameras.main.fadeIn(100, 0, 0, 0);

    this.title = this.add.text(this.game.config.width * 0.5, 64, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.title.setOrigin(0.5);

    this.highscoreLabel = this.add.text(this.game.config.width * 0.5, 128, `${this.sys.game.globals.playerName.toUpperCase()} SCORE: ${this.sys.game.globals.score}`, {
      fontFamily: 'monospace',
      fontSize: 32,
      fontStyle: 'bold',
      color: '#0f3',
      align: 'center',
    }).setOrigin(0.5);

    postScores(this.sys.game.globals.playerName, this.sys.game.globals.score);

    this.restartButton = this.add.sprite(config.width / 2, config.height / 2, 'normal').setInteractive();
    this.restartText = this.add.text(config.width / 2, config.height / 2, 'Restart', { fontSize: '32px', fill: '#fff' });
    Phaser.Display.Align.In.Center(this.restartText, this.restartButton);

    this.restartButton.on('pointerover', () => {
      this.restartButton.setTexture('hover');
      if (this.model.soundOn === false) this.sfx.btnOver.stop();
      else this.sfx.btnOver.play();
    });

    this.restartButton.on('pointerout', () => {
      this.restartButton.setTexture('normal');
    });

    this.restartButton.on('pointerdown', () => {
      this.restartButton.setTexture('pressed');
      if (this.model.soundOn === false) this.sfx.btnDown.stop();
      else this.sfx.btnDown.play();
      this.cameras.main.fadeOut(1000, 0, 0, 0);
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        this.time.delayedCall(1000, () => {
          this.scene.start('Game');
        });
      });
    });

    this.highscoreButton = new Button(this, 400, 500, 'normal', 'hover', 'pressed', 'Highscore', 'Highscore', this.sfx.btnOver, this.sfx.btnDown);

    this.menuButton = new Button(this, config.width / 2, config.height / 2 + 100, 'normal', 'hover', 'pressed', 'Menu', 'Title', this.sfx.btnOver, this.sfx.btnDown);

    this.gameBackgrounds = ['bg2', 'bg3', 'bg4'];
    this.backgrounds = [];
    for (let i = 0; i < 3; i += 1) {
      const bg = new ScrollingBackground(this, this.gameBackgrounds[i], i * 10);
      this.backgrounds.push(bg);
    }
  }
}