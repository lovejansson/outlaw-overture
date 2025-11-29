
import { Scene } from "./lib/index.js";
import { BASE_URL } from "./config.js";
import AnimatedImage from "./AnimatedSprite.js";

export default class Pause extends Scene {

    constructor() {
        super();
    }

    async init() {
        this.art.images.add("pause", `${BASE_URL}assets/images/pause.png`);
        this.art.images.add("arrow", `${BASE_URL}assets/images/arrow.png`);
        await this.art.images.load();

        const response2 = await fetch('./arrow.json');
        const config = await response2.json();

        this.arrow = new AnimatedImage(this, Symbol("arrow"), "arrow", config);
    }

    update(elapsed) {
        this.arrow.update(elapsed)
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        ctx.drawImage(this.art.images.get("pause"), 0, 0)

        this.arrow.draw(ctx)
    }

    start(){

    }

    stop(){
        
    }
}