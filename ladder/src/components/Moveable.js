import { Component } from '../Component';

export class Moveable extends Component {
    constructor(speed = 0.0) {
        super('moveable');

        this.speed = Number(speed);
    }

    getSpeed() {
        return this.speed;
    }
    setSpeed(speed) {
        this.speed = Number(speed);
    }
}
