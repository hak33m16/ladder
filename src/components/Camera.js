import { Component } from '../Component';

export class Camera extends Component {
    constructor() {
        super('camera');

        this.xOffset = 0;
        this.yOffset = 0;
    }

    getXOffset() {
        return this.xOffset;
    }

    setXOffset(xOffset) {
        this.xOffset = xOffset;
    }

    getYOffset() {
        return this.yOffset;
    }

    setYOffset(yOffset) {
        this.yOffset = yOffset;
    }
}
