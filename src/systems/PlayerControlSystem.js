import { System } from '../System';

import { Position } from '../components/Position';
import { Velocity } from '../components/Velocity';
import { Moveable } from '../components/Moveable';
import { Collideable } from '../components/Collideable';

import { DirectionVelocityMap } from '../components/Character';

export const DirectionSpriteMap = {
    0: 'character-left.png',
    1: 'character.png',
};

export class PlayerControlSystem extends System {
    constructor(keyPressedOnceHandler, platformController) {
        super('movementSystem');
        this.keyPressedOnceHandler = keyPressedOnceHandler;
        this.platformController = platformController;
    }

    update() {
        const player = this.entityManager.queryTag('player')[0];
        // console.log('player direction:', player.character.getDirection());
        // console.log('player sprite:', player.sprite.getImage());
        player.sprite.setImage(
            DirectionSpriteMap[player.character.getDirection()]
        );

        let currentPlatformNode = this.platformController.getBottomPlatform();
        // console.log('platform controller:', this.platformController);

        if (this.keyPressedOnceHandler.isPressed(' ')) {
            let nextPlatformNode = currentPlatformNode.next;
            let playerDirection = player.character.getDirection();

            console.log('next platform node:', nextPlatformNode);
            console.log('player direction:', playerDirection);
            console.log('direction velocity map:', DirectionVelocityMap);

            if (
                nextPlatformNode.relativePosition !=
                DirectionVelocityMap[playerDirection]
            ) {
                // TODO: Come up with an easy way to emit some kind of restart event
                alert('failure!');
            } else {
                this.platformController.removeBottomPlatform();
                player.stats.setHeight(player.stats.getHeight() + 1);
            }
        } else if (this.keyPressedOnceHandler.isPressed('Control')) {
            player.character.setDirection(
                (player.character.getDirection() + 1) % 2
            );

            let nextPlatformNode = currentPlatformNode.next;
            let playerDirection = player.character.getDirection();
            // reverse direction
            if (
                nextPlatformNode.relativePosition !=
                DirectionVelocityMap[playerDirection]
            ) {
                // TODO: Come up with an easy way to emit some kind of restart event
                alert('failure!');
            } else {
                this.platformController.removeBottomPlatform();
                player.stats.setHeight(player.stats.getHeight() + 1);
            }
            console.log('mctest');
        }
    }
}
