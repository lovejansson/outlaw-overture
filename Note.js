import {ArtObject, Scene} from "./lib/index.js";

export default class Note extends ArtObject {
    /**
     * @param {Scene} scene 
     * @param {{x: number,y: number}} pos 
     */
  constructor(scene, pos) {
        super(scene, Symbol("note"));
        this.pos = pos;

        const rand = Math.random();

        this.vel = {y: -1, x: rand > 0.67 ? 1 : rand > 0.33 ? 0 : -1}

        this.image = rand > 0.5 ? "double-note" : "note";
  }

  update() {

    if (this.pos.y < - 4) {
      this.isKilled = true;
    }

    this.pos.y += this.vel.y;

    this.pos.x += this.vel.x;

    this.vel.x 
   
  }

  draw(ctx) {
    ctx.drawImage(this.scene.art.images.get(this.image), this.pos.x, this.pos.y);
  }
}
