import Phaser from 'phaser';
import Entity from './Entity';
import AlienLaser from './Weapons/AlienLaser';

export default class AlienShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'alien', 'AlienShip');
    this.body.velocity.x -= Phaser.Math.Between(50, 100);

    this.shootTimer = this.scene.time.addEvent({
      delay: 2500,
      callback: () => {
        const laser = new AlienLaser(
          this.scene,
          this.x,
          this.y,
        );
        // laser.setScale(0.1);
        laser.setAngle(180);
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