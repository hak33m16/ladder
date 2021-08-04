import { Component } from '../Component';

export class Collideable extends Component {
    constructor(width = 0.0, height = 0.0) {
        super('collideable');

        this.width = Number(width);
        this.height = Number(height);
    }

    getWidth() {
        return this.width;
    }
    setWidth(width) {
        this.width = Number(width);
    }

    getHeight() {
        return this.height;
    }
    setHeight(height) {
        this.height = Number(height);
    }
}
