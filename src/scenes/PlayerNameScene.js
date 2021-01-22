import Phaser from 'phaser';

export default class PlayerNameScene extends Phaser.Scene {
  constructor() {
    super('PlayerName');
  }

  create() {
    this.message = this.add.text(640, 250, "Hello, --", {
      color: '#FFFFFF',
      fontSize: 60,
      fontStyle: 'bold',
    }).setOrigin(0.5);
  }
}