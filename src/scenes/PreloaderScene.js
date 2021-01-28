import Phaser from 'phaser';
import box from '../assets/ui/grey_box.png';
import checkbox from '../assets/ui/checkbox.png';
import normal from '../assets/ui/normal.png';
import hover from '../assets/ui/hover.png';
import pressed from '../assets/ui/pressed.png';
import mute from '../assets/ui/mute.png';
import unmute from '../assets/ui/unmute.png';
import bg from '../assets/Bgs/bg.png';
import bg1 from '../assets/Bgs/bg1.jpg';
import bg2 from '../assets/Bgs/bg2.png';
import bg3 from '../assets/Bgs/bg3.png';
import bg4 from '../assets/Bgs/bg4.png';
import bg5 from '../assets/Bgs/bg5.png';
import bg6 from '../assets/Bgs/bg6.png';
import bg7 from '../assets/Bgs/bg7.png';
import fighterjet from '../assets/Ships/fighterjet.png';
import boat1 from '../assets/Ships/boat1.png';
import chaser from '../assets/Ships/chaser.png';
import alien from '../assets/Ships/alien.png';
import boss from '../assets/Ships/boss.png';
import bigBoss from '../assets/Ships/bigBoss.png';
import astro from '../assets/asteroids/astro.png';
import exp0 from '../assets/explosion/exp0.png';
import exp2 from '../assets/explosion/exp2.png';
import exp3 from '../assets/explosion/exp3.png';
import exp4 from '../assets/explosion/exp4.png';
import exp5 from '../assets/explosion/exp5.png';
import exp6 from '../assets/explosion/exp6.png';
import shot1 from '../assets/projectiles/shot1.png';
import shot2 from '../assets/projectiles/shot2.png';
import shot11 from '../assets/projectiles/shot11.png';
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
    // adding title
    this.title = this.add.text(this.game.config.width * 0.5, 64, 'Earth Defenders', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.title.setOrigin(0.5);

    // adding logo image
    this.add.image(300, 200, 'two').setScale(0.5).setAngle(-90);
    this.add.image(500, 200, 'four').setScale(0.9).setAngle(-90);

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
    this.load.image('box', box);
    this.load.image('checkbox', checkbox);
    this.load.image('normal', normal);
    this.load.image('hover', hover);
    this.load.image('pressed', pressed);
    this.load.image('mute', mute);
    this.load.image('unmute', unmute);

    // background objects
    this.load.image('bg', bg);
    this.load.image('bg1', bg1);
    this.load.image('bg2', bg2);
    this.load.image('bg3', bg3);
    this.load.image('bg4', bg4);
    this.load.image('bg5', bg5);
    this.load.image('bg6', bg6);
    this.load.image('bg7', bg7);

    // enemy objects
    this.load.image('boat1', boat1);
    this.load.image('alien', alien);
    this.load.image('chaser', chaser);
    this.load.image('fighterjet', fighterjet);
    this.load.image('boss', boss);
    this.load.image('bigBoss', bigBoss);

    // explosion
    this.load.spritesheet('exp0', exp0, {
      frameWidth: 96,
      frameHeight: 96,
    });

    this.load.spritesheet('exp2', exp2, {
      frameWidth: 96,
      frameHeight: 96,
    });

    this.load.spritesheet('exp3', exp3, {
      frameWidth: 96,
      frameHeight: 96,
    });

    this.load.spritesheet('exp4', exp4, {
      frameWidth: 96,
      frameHeight: 96,
    });

    this.load.spritesheet('exp5', exp5, {
      frameWidth: 96,
      frameHeight: 96,
    });

    this.load.spritesheet('exp6', exp6, {
      frameWidth: 96,
      frameHeight: 96,
    });

    // asteroids
    this.load.spritesheet('astroy1', astro, {
      frameWidth: 32,
      frameHeight: 32,
    });

    // laser objects
    this.load.image('shot1', shot1);
    this.load.image('shot2', shot2);
    this.load.image('shot11', shot11);
    this.load.image('shotbig', shotbig);
    this.load.image('shotsmall', shotsmall);
    this.load.image('shotoval', shotoval);
    this.load.image('shotwave', shotwave);

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