import { Component } from '../Component';

export class Stats extends Component {
    constructor() {
        super('stats');

        this.health = 0;
        this.fear = 0;
        this.anxiety = 0;
    }

    getHealth() {
        return this.health;
    }

    setHealth(health) {
        this.health = health;
    }

    getFear() {
        return this.fear;
    }

    setFear(fear) {
        this.fear = fear;
    }
}
