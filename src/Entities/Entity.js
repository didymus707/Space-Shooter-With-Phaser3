/* eslint-disable max-len */
import Phaser from 'phaser';

export default class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData('type', type);
    this.setData('isDead', false);
  }

  explode(canDestroy) {
    if (!this.getData('isDead')) {
      this.exp0 = this.setTexture('exp0');
      this.exp1 = this.setTexture('exp1');
      this.exp2 = this.setTexture('exp2');
      // this.exp3 = this.setTexture('exp3');
      this.expArr = ['exp0', 'exp1', 'exp2'];
      this.play(this.expArr[Phaser.Math.Between(0, 3)]);
      // this.play('exp0');
      this.scene.sfx.explosions[Phaser.Math.Between(0, this.scene.sfx.explosions.length - 1)].play();

      if (this.shootTimer !== undefined) {
        if (this.shootTimer) this.shootTimer.remove(false);
      }

      this.setAngle(0);
      this.body.setVelocity(0, 0);

      this.on('animationcomplete', () => {
        if (canDestroy) this.destroy();
        else this.setVisible(false);
      });

      this.setData('isDead', true);
    }
  }
}