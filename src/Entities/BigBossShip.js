import Phaser from 'phaser';
import Entity from './Entity';
import BigBossLaser from './Weapons/BigBossLaser';

export default class BigBossShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'bigBoss', 'BigBossShip');
    this.body.velocity.x -= Phaser.Math.Between(50, 100);

    this.shootTimer = this.scene.time.addEvent({
      delay: 1500,
      callback: () => {
        const laser = new BigBossLaser(
          this.scene,
          this.x,
          this.y,
        );
        laser.setScale(2);
        laser.setAngle(180);
        this.scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true,
    });

    // this.play('bigBoss');
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }
}