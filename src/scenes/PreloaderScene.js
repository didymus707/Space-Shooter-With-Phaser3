import Phaser from "phaser";
import bb1 from '../assets/ui/blue_button02.png';
import bb2 from '../assets/ui/blue_button03.png';
import phaserLogo from '../assets/logo.png';
import box from '../assets/ui/grey_box.png';
import checkBox from '../assets/ui/blue_boxCheckmark.png';
import sound from '../assets/TownTheme.mp3';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
    this.readyCount = undefined;
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    // adding logo image
    this.add.image(110, 50, 'zenva')

    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.3);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#fff'
      }
    });
    assetText.setOrigin(0.5, 1);

    // update prograss bar
    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    // remove progress bar when complete
    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    }.bind(this));

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets needed in our game
    this.load.image('bb1', bb1);
    this.load.image('bb2', bb2);
    this.load.image('phaserLogo', phaserLogo);
    this.load.image('box', box);
    this.load.image('checkBox', checkBox);
    this.load.audio('bgMusic', [sound]);
  }

  ready() {
    this.readyCount++;
    if (this.readyCount === 2) this.scene.start('Title');
  }
}