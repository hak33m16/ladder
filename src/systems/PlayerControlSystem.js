import { System } from '../System';

import { Position } from '../components/Position';
import { Velocity } from '../components/Velocity';
import { Moveable } from '../components/Moveable';
import { Collideable } from '../components/Collideable';

export class PlayerControlSystem extends System {
    constructor(keyPressedOnceHandler, platformController) {
        super('movementSystem');
        this.keyPressedOnceHandler = keyPressedOnceHandler;
        this.platformController = platformController;
    }

    update() {
        const player = this.entityManager.queryTag('player')[0];

        let currentPlatformNode = this.platformController.getBottomPlatform();
        // console.log('platform controller:', this.platformController);

        if (this.keyPressedOnceHandler.isPressed(' ')) {
            this.platformController.removeBottomPlatform();
            player.stats.setHeight(player.stats.getHeight() + 1);
        }
    }
}
