import { Component } from '../Component';

export class Image extends Component {
    constructor(image = null) {
        super('image');

        this.image = image;
    }

    getImage() {
        return this.image;
    }

    setImage(image) {
        this.image = image;
    }
}
