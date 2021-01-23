/* eslint-disable no-unused-vars */
import Phaser from 'phaser';
import InputTextPlugin from 'phaser3-rex-plugins/plugins/inputtext-plugin';
import Model from './Model';
import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';
import TitleScene from './scenes/TitleScene';
import PlayerNameScene from './scenes/PlayerNameScene';
import GameScene from './scenes/GameScene';
import OptionsScene from './scenes/OptionsScene';
import CreditsScene from './scenes/CreditsScene';
import GameOverScene from './scenes/GameOverScene';
import HighscoreScene from './scenes/HighscoreScene';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  dom: {
    createContainer: true,
  },
  plugins: {
    global: [{
      key: 'rexFirebase',
      plugin: InputTextPlugin,
      start: true,
    }],
  },
  pixelArt: true,
  roundPixels: true,
};

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = {
      model, bgMusic: null, score: 0, playerName: null,
    };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('PlayerName', PlayerNameScene);
    this.scene.add('Game', GameScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.add('Highscore', HighscoreScene);
    this.scene.start('Boot');
  }
}

const game = new Game();
