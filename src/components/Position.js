import { Component } from '../Component';

export class Position extends Component {
    constructor(x = 0, y = 0) {
        super('position');

        this.x = Number(y);
        this.y = Number(y);
    }

    getX() {
        return this.x;
    }
    setX(x) {
        this.x = Number(x);
    }

    getY() {
        return this.y;
    }
    setY(y) {
        this.y = Number(y);
    }
}
