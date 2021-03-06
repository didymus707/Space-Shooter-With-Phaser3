/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
import Phaser from 'phaser';
import config from '../config/config';
import ScrollingBackground from '../utilities/ScrollingBackground';

export default class PlayerNameScene extends Phaser.Scene {
  constructor() {
    super('PlayerName');
  }

  preload() {
    this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);
  }

  create() {
    this.model = this.sys.game.globals.model;

    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown'),
    };

    this.gameBackgrounds = ['bg2', 'bg3', 'bg4', 'bg5', 'bg6', 'bg7'];
    this.backgrounds = [];
    for (let i = 0; i < 6; i += 1) {
      const bg = new ScrollingBackground(this, this.gameBackgrounds[i], i * 10);
      this.backgrounds.push(bg);
    }

    this.nameInput = this.add.text(0, 0, '', {
      color: '#fff',
      fontSize: '36px',
      fontStyle: 'bold',
      align: 'center',
    }).setOrigin(0.5, 0.5);

    this.inputText = this.add.rexInputText(400, 260, 500, 50, {
      type: 'text',
      placeholder: 'Enter your name',
      fontSize: '36px',
      color: '#00ff33',
      align: 'center',
      borderBottom: '4px solid #ffd700',
    }).setOrigin(0.5, 0.5).on('textChange', () => {
      this.nameInput.text = this.inputText.text;
    });

    this.nameInput.text = this.inputText.text;

    this.text = this.add.text(160, 100, 'Enter Your Pilot Name', { fontSize: 40 });

    this.continueButton = this.add.sprite(config.width / 2, config.height / 2 + 50, 'normal').setInteractive();
    this.continueText = this.add.text(config.width / 2, config.height / 2 + 50, 'Continue', { fontSize: '32px', fill: '#fff' });
    Phaser.Display.Align.In.Center(this.continueText, this.continueButton);

    this.continueButton.on('pointerover', () => {
      this.continueButton.setTexture('hover');
      if (this.model.soundOn === false) this.sfx.btnOver.stop();
      else this.sfx.btnOver.play();
    });

    this.continueButton.on('pointerout', () => {
      this.continueButton.setTexture('normal');
    });

    this.continueButton.on('pointerdown', () => {
      this.continueButton.setTexture('pressed');
      if (this.model.soundOn === false) this.sfx.btnDown.stop();
      else this.sfx.btnDown.play();
      this.nameInput.text = this.inputText.text;
      if (this.nameInput.text.length > 0) {
        this.sys.game.globals.playerName = this.nameInput.text;
        this.inputText.destroy();
        this.cameras.main.fadeOut(2000, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
          this.time.delayedCall(2000, () => {
            this.scene.start('Game');
          });
        });
      }
    });
  }
}