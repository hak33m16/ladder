import { Component } from '../Component';

export class Stats extends Component {
    constructor() {
        super('stats');

        this.height = 0;
    }

    getHeight() {
        return this.height;
    }

    setHeight(height) {
        this.height = height;
    }
}
