import { Component } from '../Component';

export class Offset extends Component {
    constructor() {
        super('offset');

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
