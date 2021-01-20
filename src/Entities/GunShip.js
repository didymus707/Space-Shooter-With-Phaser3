import Phaser from 'phaser';
import Entity from './Entity';
import EnemyLaser from './EnemyLaser';

export default class GunShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'boat1', 'GunShip');
    this.body.velocity.x -= Phaser.Math.Between(50, 100);

    this.shootTimer = this.scene.time.addEvent({
      delay: 1500,
      callback: () => {
        const laser = new EnemyLaser(
          this.scene,
          this.x,
          this.y,
        );
        laser.setScale(0.2);
        laser.setAngle(-90);
        this.scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true,
    });
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }
}