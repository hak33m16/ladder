import { Component } from '../Component';

export class Camera extends Component {
    constructor(target) {
        super('camera');

        this.target = target;
    }
}
