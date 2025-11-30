
import { Scene, AnimatedImage } from "./lib/index.js";
import { BASE_URL } from "./config.js";

export default class Pause extends Scene {

    constructor() {
        super();
    }

    async init() {
        this.art.images.add("pause", `${BASE_URL}assets/images/pause.png`);
        this.art.images.add("arrow", `${BASE_URL}assets/images/arrow.png`);
        await this.art.images.load();

        const res = await fetch(`${BASE_URL}assets/anim/arrow.json`);
        const config = await res.json();

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