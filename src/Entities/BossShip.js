import Phaser from 'phaser';
import Entity from './Entity';
import BossLaser from './Weapons/BossLaser';

export default class BossShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'boss', 'BossShip');
    this.body.velocity.x -= Phaser.Math.Between(50, 100);

    this.shootTimer = this.scene.time.addEvent({
      delay: 1500,
      callback: () => {
        const laser = new BossLaser(
          this.scene,
          this.x,
          this.y,
        );
        laser.setScale(1);
        laser.setAngle(180);
        this.scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true,
    });

    // this.play('boss');
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }
}