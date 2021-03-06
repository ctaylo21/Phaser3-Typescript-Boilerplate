import logoImg from '../assets/logo.png';

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'MainMenuScene',
    });
  }

  preload(): void {
    this.load.image('logo', logoImg);
  }

  create(): void {
    const logo = this.add.image(400, 150, 'logo');

    this.tweens.add({
      targets: logo,
      y: 450,
      duration: 2000,
      ease: 'Power2',
      yoyo: true,
      loop: -1,
    });
  }
}
