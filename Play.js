import { Scene } from "./lib/index.js";
import { BASE_URL } from "./config.js";
import Note from "./Note.js";
import AnimatedImage from "./AnimatedSprite.js"

export default class Play extends Scene {

    constructor() {
        super();
        this.notes = [];
        this.lastElapsedNoteSpawn = 0;
    }

    async init() {
        this.art.images.add("note", `${BASE_URL}assets/images/note.png`);
        this.art.images.add("double-note", `${BASE_URL}assets/images/double-note.png`);
        this.art.images.add("background", `${BASE_URL}assets/images/background.png`);
        this.art.images.add("mgk", `${BASE_URL}assets/images/mgk.png`);
        this.art.images.add("stereo", `${BASE_URL}assets/images/stereo.png`)

        this.art.audio.add("song", `${BASE_URL}assets/audio/outlaw-overture.mp3`);

        await this.art.images.load();
        await this.art.audio.load();

        const response = await fetch('./mgk.json');
        const mgkConfig = await response.json();

         const response2 = await fetch('./stereo.json');
        const stereoConfig = await response2.json();

        this.mgk = new AnimatedImage(this, Symbol("mgk"), "mgk", mgkConfig);
        this.stereo = new AnimatedImage(this, Symbol("stereo"), "stereo", stereoConfig);

        this.notes.push(new Note(this, { x: 101 + Math.floor(Math.random() * 16), y: 87 }));
    }


    update(elapsed) {

        if(elapsed  - this.lastElapsedNoteSpawn >= 250) {

            this.notes.push(
                new Note(this, { x: 101 + Math.floor(Math.random() * 11), y: 87 })
            );

            this.lastElapsedNoteSpawn = elapsed;
        } 

        this.mgk.update(elapsed);
        this.stereo.update(elapsed);

        for (const n of this.notes) {
            n.update(elapsed);
        }

        this.notes = this.notes.filter(s => !s.isKilled);
    }


    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        ctx.drawImage(this.art.images.get("background"), 0, 0)
        this.mgk.draw(ctx);
        this.stereo.draw(ctx);

        for (const n of this.notes) {
            n.draw(ctx);
        }
    }

    start(){
        this.art.audio.play("song");

    }

    stop(){
           this.art.audio.stop("song");
    }

}