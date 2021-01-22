import Phaser from 'phaser';
import Player from '../Entities/Player';
import BoatShip from '../Entities/BoatShip';
import ChaserShip from '../Entities/ChaserShip';
import AlienShip from '../Entities/AlienShip';
import BossShip from '../Entities/BossShip';
import BigBossShip from '../Entities/BigBossShip';
import ScrollingBackground from '../utilities/ScrollingBackground';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.score = 0;
    this.scoreText = undefined;
  }

  create() {
    this.anims.create({
      key: 'exp0',
      frames: this.anims.generateFrameNumbers('exp0'),
      frameRate: 30,
      repeat: 0,
    });

    this.anims.create({
      key: 'exp2',
      frames: this.anims.generateFrameNumbers('exp2'),
      frameRate: 30,
      repeat: 0,
    });

    this.anims.create({
      key: 'exp3',
      frames: this.anims.generateFrameNumbers('exp3'),
      frameRate: 30,
      repeat: 0,
    });

    this.anims.create({
      key: 'exp4',
      frames: this.anims.generateFrameNumbers('exp4'),
      frameRate: 30,
      repeat: 0,
    });

    this.anims.create({
      key: 'exp5',
      frames: this.anims.generateFrameNumbers('exp5'),
      frameRate: 30,
      repeat: 0,
    });

    this.anims.create({
      key: 'exp6',
      frames: this.anims.generateFrameNumbers('exp6'),
      frameRate: 30,
      repeat: 0,
    });

    this.sfx = {
      explosions: [
        this.sound.add('sndExplode'),
        this.sound.add('sndExplode0'),
        this.sound.add('sndExplode1'),
      ],
      laser: this.sound.add('sndLaser'),
    };

    this.gameBackgrounds = ['bg', 'bg1', 'bg2', 'bg3', 'bg4', 'bg5', 'bg6', 'bg7'];
    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const bg = new ScrollingBackground(this, this.gameBackgrounds[i], i * 10);
      this.backgrounds.push(bg);
    }

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
      delay: 1700,
      callback: () => {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new BoatShip(
            this,
            this.game.config.width,
            Phaser.Math.Between(0, this.game.config.height),
          );
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType('ChaserShip').length < 5) {
            enemy = new ChaserShip(
              this,
              this.game.config.width,
              Phaser.Math.Between(0, this.game.config.height),
            ).setScale(0.05);
          }
        } else if (Phaser.Math.Between(0, 10) >= 4) {
          if (this.getEnemiesByType('AlienShip').length < 4) {
            enemy = new AlienShip(
              this,
              this.game.config.width,
              Phaser.Math.Between(0, this.game.config.height),
            ).setScale(0.07);
          }
        } else if (Phaser.Math.Between(0, 10) >= 6) {
          if (this.getEnemiesByType('BossShip') < 3) {
            enemy = new BossShip(
              this,
              this.game.config.width,
              Phaser.Math.Between(0, this.game.config.height),
            ).setScale(0.5).setAngle(-90);
          }
        } else {
          enemy = new BigBossShip(
            this,
            this.game.config.width,
            Phaser.Math.Between(0, this.game.config.height),
          ).setScale(0.5).setAngle(-90);
        }

        if (enemy !== null) {
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });

    this.physics.add.collider(this.playerLasers, this.enemies, (playerLaser, enemy) => {
      if (enemy) {
        if (enemy.onDestroy !== undefined) enemy.onDestroy();

        enemy.explode(true);
        playerLaser.destroy();
        this.score = this.updateScore(enemy);
      }
    });

    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (!player.getData('isDead') && !enemy.getData('isDead')) {
        player.explode(false);
        player.onDestroy();
        enemy.explode(true);
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, (player, laser) => {
      if (!player.getData('isDead') && !laser.getData('isDead')) {
        player.explode(false);
        player.onDestroy();
        laser.explode();
      }
    });

    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });
  }

  updateScore(enemy) {
    if (enemy.getData('type') === 'BoatShip') {
      this.sys.game.globals.score += 1;
    } else if (enemy.getData('type') === 'ChaserShip' || enemy.getData('type') === 'AlienShip') {
      this.sys.game.globals.score += 3;
    } else if (enemy.getData('type') === 'BossShip') {
      this.sys.game.globals.score += 5;
    } else {
      this.sys.game.globals.score += 7;
    }
    this.scoreText.setText(`Score: ${this.score}`);
    return this.score;
  }

  getEnemiesByType(type) {
    const arr = [];
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') === type) arr.push(enemy);
    }
    return arr;
  }

  update() {
    this.player.update();

    if (!this.player.getData('isDead')) {
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

      if (this.keySpace.isDown) {
        this.player.setData('isShooting', true);
      } else {
        this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
        this.player.setData('isShooting', false);
      }
    }

    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      enemy.update();

      if (enemy.x < -enemy.displayWidth
        || enemy.x > this.game.config.width + enemy.displayWidth
        || enemy.y < -enemy.displayHeight * 4
        || enemy.y > this.game.config.height + enemy.displayHeight) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }
    }

    for (let i = 0; i < this.enemyLasers.getChildren().length; i += 1) {
      const laser = this.enemyLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (let i = 0; i < this.playerLasers.getChildren().length; i += 1) {
      const laser = this.playerLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    // for (let i = 0; i < this.backgrounds.length; i += 1) {
    //   this.backgrounds[i].update();
    // }
  }
}