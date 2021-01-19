import Phaser from 'phaser';
import Player from '../Entities/Player';
import GunShip from '../Entities/GunShip';

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
    this.add.image(600, 280, 'enemy2').setScale(0.4).setAngle(-90);
    // const player = this.physics.add.image(85, 280, 'player').setScale(0.08).setOrigin(1, 0.1);
    // player.setCollideWorldBounds(true);

    // this.anims.create({
    //   key: 'player',
    //   frames: this.anims.generateFrameNumbers('player'),
    //   frameRate: 20,
    // });

    this.sfx = {
      explosions: [
        this.sound.add('sndExplode'),
        this.sound.add('sndExplode0'),
        this.sound.add('sndExplode1'),
      ],
      laser: this.sound.add('sndLaser'),
    };

    this.player = new Player(
      this,
      this.game.config.width * 0.106,
      this.game.config.height * 0.47,
      'player',
    ).setScale(0.08).setOrigin(1, 0.1);

    // initializing the game controls
    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // laser and enemies groups
    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.time.addEvent({
      delay: 100,
      callback: () => {
        const enemy = new GunShip(
          this,
          this.game.config.width,
          Phaser.Math.Between(0, this.game.config.height),
        );
        this.enemies.add(enemy);
      },
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    this.player.update();

    if (this.keyUp.isDown) {
      this.player.moveUp();
    } else if (this.keyDown.isDown) {
      this.player.moveDown();
    }

    if (this.keyLeft.isDown) {
      this.player.moveLeft();
    } else if (this.keyRight.isDown) {
      this.player.moveRight();
    }

    // this.cameras.main.startFollow(this.player);
  }
}