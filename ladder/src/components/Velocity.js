import { Component } from '../Component';

export class Velocity extends Component {
    constructor(vecx = 0.0, vecy = 0.0) {
        super('velocity');

        this.vecx = Number(vecx);
        this.vecy = Number(vecy);
    }

    getVelocityX() {
        return this.vecx;
    }
    setVelocityX(vecx) {
        this.vecx = Number(vecx);
    }

    getVelocityY() {
        return this.vecy;
    }
    setVelocityY(vecy) {
        this.vecy = Number(vecy);
    }
}
