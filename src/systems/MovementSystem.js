import { System } from '../System';

import { Position } from '../components/Position';
import { Velocity } from '../components/Velocity';
import { Moveable } from '../components/Moveable';
import { Collideable } from '../components/Collideable';

export class MovementSystem extends System {
    constructor(eventManager) {
        super('movementSystem', eventManager);
    }

    update() {
        var candidates = this.entityManager.queryComponents([
            Position,
            Velocity,
            Moveable,
            Collideable,
        ]);

        candidates.forEach(function (entity) {
            var x = Number(entity.position.getX());
            var y = Number(entity.position.getY());

            var speed = Number(entity.moveable.getSpeed());

            entity.position.setX(
                Number(x + Number(entity.velocity.getVelocityX() * speed))
            );
            entity.position.setY(
                Number(y + Number(entity.velocity.getVelocityY() * speed))
            );
        });
    }
}
