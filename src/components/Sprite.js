import { Component } from '../Component';

export class Sprite extends Component {
    constructor(image = null) {
        super('sprite');

        this.image = image;
    }

    getImage() {
        return this.image;
    }

    setImage(image) {
        this.image = image;
    }
}
