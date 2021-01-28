import Phaser from 'phaser';

export default class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key1, key2, key3, text, targetScene, sound1, sound2) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.model = this.scene.sys.game.globals.model;

    this.button = this.scene.add.sprite(0, 0, key1).setInteractive();
    this.text = this.scene.add.text(0, 0, text, { fontSize: '32px', fill: '#fff' });
    Phaser.Display.Align.In.Center(this.text, this.button);

    this.add(this.button);
    this.add(this.text);

    this.button.on('pointerdown', () => {
      this.button.setTexture(key3);
      if (this.model.soundOn === false) {
        sound2.stop();
      } else {
        sound2.play();
      }
      this.scene.scene.start(targetScene);
    });

    this.button.on('pointerover', () => {
      this.button.setTexture(key2);
      if (this.model.soundOn === false) {
        sound1.stop();
      } else {
        sound1.play();
      }
    });

    this.button.on('pointerout', () => {
      this.button.setTexture(key1);
    });

    this.scene.add.existing(this);
  }
}