import { CST } from "../CST";
export class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LOAD
        })
    }
    init() {

    }
    loadImages() {
        this.load.setPath("./assets/image");

        for (let prop in CST.IMAGE) {
            //@ts-ignore
            this.load.image(CST.IMAGE[prop], CST.IMAGE[prop]);
        }
    }
    loadAudio() {
        this.load.setPath("./assets/audio");

        for (let prop in CST.AUDIO) {
            //@ts-ignore
            this.load.audio(CST.AUDIO[prop], CST.AUDIO[prop]);
        }
    }
    loadSpritesheet(keys: string[], frameConfig?: Phaser.Loader.FileTypes.ImageFrameConfig) {
        this.load.setPath("./assets/sprite");

        for (let i = 0; i < keys.length; i++) {
            //@ts-ignore
            this.load.spritesheet(keys[i], keys[i], frameConfig);
        }
    }
    loadAtlas() {
        this.load.setPath("./assets/atlas");

        for (let prop in CST.ATLAS) {
            //@ts-ignore
            this.load.atlas(CST.ATLAS[prop], `${CST.ATLAS[prop]}.png`, `${CST.ATLAS[prop]}.json`)
        }

    }
    loadSpriteSheetAtlas(keys: string[], atlas: string, frameConfig: Phaser.Loader.FileTypes.ImageFrameConfig) {
        for (let i = 0; i < keys.length; i++) {
            this.textures.addSpriteSheetFromAtlas(keys[i], { frameHeight: frameConfig.frameHeight, frameWidth: frameConfig.frameWidth, atlas: atlas, frame: keys[i] });
        }
    }
    createSharedAnimations(keys: string[], config: { animationName: string, frameRate: number, frames: number[], repeat?: number }) {
        for (let i = 0; i < keys.length; i++) {

            this.anims.create({
                key: `${keys[i]}${config.animationName}`,
                frameRate: config.frameRate,
                frames: this.anims.generateFrameNumbers(keys[i], {
                    frames: config.frames
                }),
                repeat: config.repeat
            })
        }
    }
    preload() {

        //load image, spritesheet, sound
        this.loadImages();
        this.loadAudio();
        this.loadAtlas();
        this.loadSpritesheet([CST.SPRITE.CAT], { frameHeight: 32, frameWidth: 32 });
        this.loadSpritesheet([CST.SPRITE.ANNA], { frameWidth: 64, frameHeight: 64 });

        //create loading bar

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff //white
            }
        })

        /*
        Loader Events:
            complete - when done loading everything
            progress - loader number progress in decimal
        */

        //simulate large load
        /*
        for(let i = 0; i < 100; i++){
            this.load.spritesheet("cat" + i, "./assets/cat.png", {
                frameHeight: 32,
                frameWidth: 32
            });        
        }*/

        this.load.on("progress", (percent: number) => {
            loadingBar.fillRect(this.game.renderer.width / 2, 0, 50, this.game.renderer.height * percent);
            console.log(percent);
        })

        this.load.on("complete", () => {

        });

        this.load.on("load", (file: Phaser.Loader.File) => {
            console.log(file.src)
        })
    }
    create() {
        
        this.loadSpriteSheetAtlas([CST.SPRITE.HOODED, CST.SPRITE.MANDY], CST.ATLAS.CHARACTERS, { frameHeight: 64, frameWidth: 64 }); //needs atlas to be fully loaded first
        this.createSharedAnimations([CST.SPRITE.HOODED, CST.SPRITE.MANDY], { animationName: "right", frameRate: 9, frames: [143, 144, 145, 146, 147, 148, 149, 150, 151]});

        this.anims.create({
            key: "dazzle",
            frameRate: 10,
            //@ts-ignore
            frames: this.anims.generateFrameNames("daze", {
                prefix: "daze0",
                suffix: ".png",
                start: 0,
                end: 41,
            }),
            repeat: -1,
        });
        
        this.anims.create({
            key: "left",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("anna", {
                start: 9,
                end: 17
            })
        });
        
        this.scene.start(CST.SCENES.MENU);
    }
}