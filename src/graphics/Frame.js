import { Vector2 } from '../system/Vector2';

export class Frame {
    constructor(duration = 0.1, sprites = []) {
        this.duration = duration;
        this.sprites = sprites;
    }

    getDuration() {
        return this.duration;
    }

    setDuration(duration) {
        this.duration = duration;
    }

    addSprite(sprite, offset = new Vector2()) {
        this.sprites.push([sprite, offset]);
    }

    setSprites(sprites) {
        this.sprites = sprites;
    }

    /**
     *
     * @param {CanvasRenderingContext2D} context
     * @param {Vector2} position
     */
    draw(context, position) {
        this.sprites.forEach((sprite) => {
            const imageRect = sprite.getImageRect();
            context.drawImage(
                sprite.getImage(),
                imageRect.x,
                imageRect.y,
                imageRect.w,
                imageRect.h,
                position.x,
                position.y,
                imageRect.w,
                imageRect.h
            );
        });
    }
}
