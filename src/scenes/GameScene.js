import Phaser from 'phaser';


export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    this.add.image(400, 100, 'starBg1');
    this.add.image(400, 300, 'starBg2');
    this.add.image(300, 200, 'nebula1').setOrigin(0.1);
    this.add.image(500, 200, 'shot1').setScale(2).setOrigin(0.1);
    this.add.image(300, 150, 'shot2').setOrigin(0.1);
    this.add.image(600, 280, 'astroy1').setScale(0.09).setOrigin(0.1);
    this.add.image(400, 100, 'astroy1').setScale(0.09).setOrigin(0.1);
    // this.add.image(600, 280, 'enemy1').setScale(0.4);
    const player = this.physics.add.image(85, 280, 'player').setScale(0.08).setOrigin(1, 0.1);
    player.setCollideWorldBounds(true);

    this.sfx = {
      explosions: [
        this.sound.add('sndExplode'),
        this.sound.add('sndExplode0'),
        this.sound.add('sndExplode1'),
      ],
      laser: this.sound.add('sndLaser'),
    };
  }

  // update() {
  //   // this.cameras.main.startFollow(this.player);
  // }
}