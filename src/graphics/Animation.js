import { Vector2 } from '../system/Vector2';

export class Animation {
    /**
     * @param {boolean} looped
     * @param {Frame[]} frames
     */
    constructor(looped = true, frames = []) {
        this.looped = looped;
        this.frames = frames;

        this.time = 0;
        this.currentFrame = 0;
        this.position = new Vector2();
    }

    addFrame(frame) {
        this.frames.push(frame);
    }

    setFrames(frames) {
        this.frames = frames;
    }

    setPosition(position) {
        this.position = position;
    }

    getPosition() {
        return this.position;
    }

    update(dt) {
        this.time += dt;
        const currentFrameTime = this.frames[this.currentFrame].getDuration();

        if (this.time >= currentFrameTime) {
            // Take remainder of frame time
            this.time = this.time % currentFrameTime;

            // Move forward one frame
            if (this.frames.length > 1) {
                this.currentFrame =
                    (this.currentFrame + 1) % this.frames.length;
            }
        }
    }

    draw(context) {
        this.frames[this.currentFrame].draw(context, this.position);
    }
}
