import { CST } from "../CST";
import { Sprite } from "../Sprite";

export class PlayScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.PLAY,
        });
    }
    preload() {

    }
    create() {

        let anna: Phaser.GameObjects.Sprite = new Sprite(this, 100, 100, CST.SPRITE.ANNA);
        let hooded: Phaser.GameObjects.Sprite = new Sprite(this, 200, 200, CST.SPRITE.HOODED);
        window.hooded = hooded;
        window.anna = anna;

        let mandy: Sprite = new Sprite(this, 100, 400, "mandy");
        window.mandy = mandy;
    }
}