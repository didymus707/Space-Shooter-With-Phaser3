export default class ScrollingBackground {
  constructor(scene, key, velocityX) {
    this.scene = scene;
    this.key = key;
    this.velocityX = velocityX;
    this.layers = this.scene.add.group();

    this.createLayers();
  }

  createLayers() {
    for (let i = 0; i < 4; i += 1) {
      const layer = this.scene.add.sprite(400, 400, this.key);
      layer.x = (layer.displayWidth * i);
      layer.setScale(1, 1);
      layer.setDepth(-5);
      this.scene.physics.world.enableBody(layer, 0);
      layer.body.velocity.x = this.velocityX;

      this.layers.add(layer);
    }
  }
}