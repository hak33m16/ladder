import { Component } from '../Component';

export class Character extends Component {
    constructor(direction = 0) {
        super('box');

        this.direction = direction;
    }

    getDirection() {
        return this.direction;
    }

    setDirection(direction) {
        this.direction = direction;
    }
}
