import { Rectangle } from '../shapes/Rectangle';

export class Sprite {
    constructor(image, imageRect = new Rectangle(0, 0, 0, 0)) {
        this.image = image;
        this.imageRect = imageRect;
    }

    getImage() {
        return this.image;
    }

    setImage(image) {
        this.image = image;
    }

    getImageRect() {
        return this.imageRect;
    }

    setImageRect(imageRect) {
        this.imageRect = imageRect;
    }
}
