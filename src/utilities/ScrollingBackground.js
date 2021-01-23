export default class ScrollingBackground {
  constructor(scene, key, velocityX) {
    this.scene = scene;
    this.key = key;
    this.velocityX = velocityX;
    this.layers = this.scene.add.group();

    this.createLayers();
  }

  createLayers() {
    for (let i = 0; i < 6; i += 1) {
      const layer = this.scene.add.sprite(500, 400, this.key);
      layer.x = (layer.displayWidth * i);
      layer.setScale(1, 1);
      layer.setDepth(-5);
      this.scene.physics.world.enableBody(layer, 0);
      layer.body.velocity.x = this.velocityX;

      this.layers.add(layer);
    }
  }

  update() {
    if (this.layers.getChildren()[0].x > 0) {
      for (let i = 0; i < this.layers.getChildren().length; i += 1) {
        const layer = this.layers.getChildren()[i];
        layer.x = (layer.displayWidth) + (layer.displayWidth * i);
      }
    }
  }
}