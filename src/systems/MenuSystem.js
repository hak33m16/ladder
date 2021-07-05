import { System } from '../System';

import { Menu } from '../menus/Menu';

export class MenuSystem extends System {
    constructor(context, canvas, imagemap) {
        super('movementSystem');
        this.context = context
        this.canvas = canvas
        this.imagemap = imagemap
    }

    update(menu) {
        menu.update();
        menu.draw(this.context, this.canvas, this.imagemap);
        // var candidates = this.entityManager.queryComponents([
        //     Position,
        //     Velocity,
        //     Moveable,
        //     Collideable,
        // ]);

        // candidates.forEach(function (entity) {
        //     var x = Number(entity.position.getX());
        //     var y = Number(entity.position.getY());

        //     var speed = Number(entity.moveable.getSpeed());

        //     entity.position.setX(
        //         Number(x + Number(entity.velocity.getVelocityX() * speed))
        //     );
        //     entity.position.setY(
        //         Number(y + Number(entity.velocity.getVelocityY() * speed))
        //     );
        // });
    }
}
