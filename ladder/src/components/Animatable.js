import { Component } from '../Component';

export class Animatable extends Component {
    constructor(animation = null) {
        super('animatable');

        this.currentAnimation = animation;
    }

    getAnimation() {
        return this.currentAnimation;
    }

    setAnimation(animation) {
        this.currentAnimation = animation;
    }
}
