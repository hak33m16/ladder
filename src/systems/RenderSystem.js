import { System } from '../System';

import { Sprite } from '../components/Sprite';
import { Position } from '../components/Position';
import { Collideable } from '../components/Collideable';
import { Velocity } from '../components/Velocity';

export class RenderSystem extends System {
    constructor(context, imagemap) {
        super('renderSystem');
        this.context = context;
        this.imagemap = imagemap;
    }

    update() {
        var candidates = this.entityManager.queryComponents([
            Sprite,
            Position,
            Collideable,
            Velocity,
        ]);

        var draw = function (entity, context, imagemap) {
            if (
                entity.position.getX() + entity.collideable.getWidth() >
                    context.canvas.width ||
                entity.position.getX() < 0
            ) {
                entity.velocity.setVelocityX(-entity.velocity.getVelocityX());
            }

            if (
                entity.position.getY() + entity.collideable.getHeight() >
                    context.canvas.height ||
                entity.position.getY() < 0
            ) {
                entity.velocity.setVelocityY(-entity.velocity.getVelocityY());
            }

            context.drawImage(
                imagemap[entity.sprite.getImage()],
                Math.abs(entity.position.getX()),
                Math.abs(entity.position.getY())
            );
        };

        // Need to pass the canvas's context to the draw function
        candidates.forEach((entity) =>
            draw(entity, this.context, this.imagemap)
        );
    }
}
