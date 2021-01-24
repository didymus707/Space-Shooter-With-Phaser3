import Phaser from 'phaser';
import Entity from './Entity';
import BoatLaser from './Weapons/BoatLaser';

export default class BoatShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'boat1', 'BoatShip');
    this.body.velocity.x -= Phaser.Math.Between(30, 70);

    this.shootTimer = this.scene.time.addEvent({
      delay: 2500,
      callback: () => {
        const laser = new BoatLaser(
          this.scene,
          this.x,
          this.y,
        );
        // eslint-disable-next-line indent
        laser.setScale(2.9).setAngle(180);
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