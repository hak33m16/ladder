import { System } from '../System';

import { Velocity } from '../components/Velocity';
import { Offset } from '../components/Offset';

export class MovementSystem extends System {
    constructor(eventManager) {
        super('movementSystem', eventManager);
    }

    update(dt) {
        var candidates = this.entityManager.queryComponents([Velocity, Offset]);

        candidates.forEach(function (entity) {
            // console.log('updating candidate:', entity);
            var x = Number(entity.offset.getXOffset());
            var y = Number(entity.offset.getYOffset());

            // var speed = Number(entity.moveable.getSpeed());

            entity.offset.setXOffset(
                Number(x + Number(entity.velocity.getVelocityX()))
            );
            entity.offset.setYOffset(
                Number(y + Number(entity.velocity.getVelocityY()))
            );
        });
    }
}
