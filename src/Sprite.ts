export class Sprite extends Phaser.GameObjects.Sprite {
    cachedKey: string;
    /**
     *
     */
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);
        
        scene.add.existing(this);
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);

        this.cachedKey = this.texture.key;
        
        this.setOrigin(0, 0);
    }
    play(animationKey: string, ignoreIfPlaying?: boolean, startFrame?: number | string) {
        super.play(`${this.cachedKey}${animationKey}`);
        return this;
    }
}