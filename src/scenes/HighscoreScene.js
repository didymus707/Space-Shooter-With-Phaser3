import Phaser from 'phaser';
import config from '../config/config';
import Button from '../Objects/Button';
import ScrollingBackground from '../utilities/ScrollingBackground';
import { getScores } from '../ScoreApi';

export default class HighscoreScene extends Phaser.Scene {
  constructor() {
    super('Highscore');
  }

  create() {
    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown'),
    };

    this.text = this.add.text(260, 15, 'Highscores', { fontSize: 40 });

    getScores().then(result => {
      result.sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map((game, i) => {
          const text = `${i + 1}. ${game.user.toUpperCase()} ______ Score: ${game.score}`;
          this.add.text(config.width * 0.5, (90 * (i + 1.1)), text, {
            fontFamily: 'monospace',
            fontSize: 32,
            fontStyle: 'bold',
            color: '#0f3',
            align: 'center',
          }).setOrigin(0.5);
          return text;
        });
    });

    this.restartButton = this.add.sprite(250, 550, 'normal').setInteractive();
    this.restartText = this.add.text(450, 550, 'Restart', { fontSize: '32px', fill: '#fff' });
    Phaser.Display.Align.In.Center(this.restartText, this.restartButton);

    this.restartButton.on('pointerover', () => {
      this.restartButton.setTexture('hover');
      this.sfx.btnOver.play();
    });

    this.restartButton.on('pointerout', () => {
      this.restartButton.setTexture('normal');
    });

    this.restartButton.on('pointerdown', () => {
      this.restartButton.setTexture('pressed');
      this.cameras.main.fadeOut(1000, 0, 0, 0);
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        this.time.delayedCall(1000, () => {
          this.scene.start('Game');
        });
      });
    });

    if (this.sys.game.globals.playerName === null) {
      this.restartButton.setVisible(false);
      this.restartText.setVisible(false);
      this.menuButton = new Button(this, config.width / 2, 550, 'normal', 'hover', 'pressed', 'Menu', 'Title', this.sfx.btnOver, this.sfx.btnDown);
    } else {
      this.menuButton = new Button(this, 500, 550, 'normal', 'hover', 'pressed', 'Menu', 'Title', this.sfx.btnOver, this.sfx.btnDown);
    }


    this.gameBackgrounds = ['bg2', 'bg3'];
    this.backgrounds = [];
    for (let i = 0; i < 3; i += 1) {
      const bg = new ScrollingBackground(this, this.gameBackgrounds[i], i * 10);
      this.backgrounds.push(bg);
    }
  }
}