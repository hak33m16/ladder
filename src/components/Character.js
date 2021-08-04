import { Component } from '../Component';

export const DirectionVelocityMap = {
    0: -1,
    1: 1,
};

export const VelocityDirectionMap = {
    '-1': 0,
    1: 1,
};

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
