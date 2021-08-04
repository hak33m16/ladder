import { Animatable } from '../components/Animatable';
import { System } from '../System';

export class AnimationSystem extends System {
    constructor() {
        super('animationSystem');
    }

    // TODO: Consider adding state transitions here. e.g. If an animation
    // is finalized, and it has a finalizer (such as walk -> idle), then
    // set the animation to the finalizer
    update(dt) {
        var candidates = this.entityManager.queryComponents([Animatable]);

        candidates.forEach((entity) => {
            entity.animatable.getAnimation().update(dt);
        });
    }
}
