import { ArtObject } from "./lib/index.js";

/**
 * Plays an animated image exported from Aseprite. 
 */
export default class AnimatedImage extends ArtObject {
    /**
     * @param {Scene} scene
     * @param {Symbol} id
     * @param {string} spritesheet .png image exported from Aseprite
     * @param {} config .json config file exported from Aseprite
     */
    constructor(scene, id, spritesheet, config) {
        super(scene,id)
        this.image = spritesheet;
        this.frames = Object.values(config.frames);
        this.currentFrameIdx = 0;
        this.elapsed = 0;
    }

    /**
     * @param {number} elapsed 
     */
    update(elapsed) {
        if (elapsed - this.elapsed >= this.frames[this.currentFrameIdx].duration) {
            if (this.currentFrameIdx === this.frames.length - 1) {
                this.currentFrameIdx = 0;
            } else {
                this.currentFrameIdx++;
            }
            this.elapsed = elapsed;
        }
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        const { x, y, w, h } = this.frames[this.currentFrameIdx].frame;
        ctx.drawImage(this.scene.art.images.get(this.image), x, y, w, h, 0, 0, w, h);
    }
}