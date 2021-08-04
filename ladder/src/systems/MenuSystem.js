import { System } from '../System';

import { Menu } from '../menus/Menu';

export class MenuSystem extends System {
    constructor(eventManager, context, canvas, imagemap, menuStack) {
        super('movementSystem', eventManager);
        this.context = context;
        this.canvas = canvas;
        this.imagemap = imagemap;
        this.menuStack = menuStack;
    }

    update() {
        this.menuStack[this.menuStack.length - 1].update();
        this.menuStack[this.menuStack.length - 1].draw(
            this.context,
            this.canvas,
            this.imagemap
        );
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
