import Phaser from 'phaser';
import bb1 from '../assets/ui/blue_button02.png';
import bb2 from '../assets/ui/blue_button03.png';
import box from '../assets/ui/grey_box.png';
import checkBox from '../assets/ui/blue_boxCheckmark.png';
import bg1 from '../assets/Bgs/bg1.jpg';
import starBg1 from '../assets/Bgs/starBg1.png';
import starBg2 from '../assets/Bgs/starBg2.png';
import nebula1 from '../assets/Stars-Nebulae/Nebula1.png';
import nebula2 from '../assets/Stars-Nebulae/Nebula2.png';
import nebula3 from '../assets/Stars-Nebulae/Nebula3.png';
import enemy1 from '../assets/Ships/enemy1.png';
import enemy2 from '../assets/Ships/enemy2.png';
import alien1 from '../assets/Ships/alien1.png';
import alien2 from '../assets/Ships/alien2.png';
import boat1 from '../assets/Ships/boat1.png';
import boat2 from '../assets/Ships/boat2.png';
import boss1 from '../assets/Ships/boss1.png';
import boss2 from '../assets/Ships/boss2.png';
import astroy1 from '../assets/asteroids/asteroid1.svg';
import astroy2 from '../assets/asteroids/asteroid2.svg';
import explosion1 from '../assets/explosion/boom01.png';
import explosion10 from '../assets/explosion/boom10.png';
import explosion11 from '../assets/explosion/boom11.png';
import flame0 from '../assets/flame/flame0.png';
import flame1 from '../assets/flame/flame1.png';
import shot1 from '../assets/projectiles/shot1.svg';
import shot2 from '../assets/projectiles/shot2.svg';
import shotbig from '../assets/projectiles/shotbig.png';
import shotoval from '../assets/projectiles/shotoval.png';
import shotsmall from '../assets/projectiles/shotsmall.png';
import shotwave from '../assets/projectiles/shotwave.png';
import player from '../assets/Ships/player.png';
import sndExplode from '../assets/explosion/sndExplode.mp3';
import sndExplode0 from '../assets/explosion/sndExplode0.wav';
import sndExplode1 from '../assets/explosion/sndExplode1.wav';
import sndBtnOver from '../assets/explosion/sndBtnOver.wav';
import sndBtnDown from '../assets/explosion/sndBtnDown.wav';
import sndLaser from '../assets/laser/shoot.mp3';
import history from '../assets/Music/history.mp3';
import menu1 from '../assets/Music/menu1.mp3';
import menu2 from '../assets/Music/menu2.mp3';
import odyssey from '../assets/Music/odyssey.ogg';

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
    this.add.image(110, 50, 'zenva');

    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.3);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#fff',
      },
    });
    assetText.setOrigin(0.5, 1);

    // update prograss bar
    this.load.on('progress', (value) => {
      // eslint-disable-next-line radix
      percentText.setText(`${parseInt(value * 100)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets needed in our game
    this.load.image('bb1', bb1);
    this.load.image('bb2', bb2);
    this.load.image('box', box);
    this.load.image('checkBox', checkBox);

    // background objects
    this.load.image('bg1', bg1);
    this.load.image('starBg1', starBg1);
    this.load.image('starBg2', starBg2);
    this.load.image('nebula1', nebula1);
    this.load.image('nebula2', nebula2);
    this.load.image('nebula3', nebula3);

    // enemy objects
    this.load.image('enemy1', enemy1);
    this.load.image('enemy2', enemy2);
    this.load.image('alien1', alien1);
    this.load.image('alien2', alien2);
    this.load.image('boat1', boat1);
    this.load.image('boat2', boat2);
    this.load.image('boss1', boss1);
    this.load.image('boss2', boss2);

    // ateroids
    this.load.image('astroy1', astroy1);
    this.load.image('astroy2', astroy2);

    // laser objects
    this.load.image('shot1', shot1);
    this.load.image('shot2', shot2);

    // loading audios
    this.load.audio('bgMusic', [history]);
    this.load.audio('menu1', [menu1]);
    this.load.audio('menu2', [menu2]);
    this.load.audio('odyssey', [odyssey]);
    this.load.audio('sndLaser', [sndLaser]);
    this.load.audio('sndExplode', [sndExplode]);
    this.load.audio('sndExplode0', [sndExplode0]);
    this.load.audio('sndExplode1', [sndExplode1]);
    this.load.audio('sndBtnOver', [sndBtnOver]);
    this.load.audio('sndBtnDown', [sndBtnDown]);

    // player objects
    this.load.image('player', player);
  }

  ready() {
    this.readyCount += 1;
    if (this.readyCount === 2) this.scene.start('Title');
  }
}