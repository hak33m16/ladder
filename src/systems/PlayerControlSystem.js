import { System } from '../System';

import { Position } from '../components/Position';
import { Velocity } from '../components/Velocity';
import { Moveable } from '../components/Moveable';
import { Collideable } from '../components/Collideable';

import {
    DirectionVelocityMap,
    VelocityDirectionMap,
} from '../components/Character';

import * as Constants from '../Constants';
import { PlayerDied } from '../events/PlayerDied';

export const DirectionSpriteMap = {
    0: 'character-left.png',
    1: 'character.png',
};

export const JumpDirectionSpriteMap = {
    0: 'character-jump-left.png',
    1: 'character-jump.png',
};

export class PlayerControlSystem extends System {
    constructor(eventManager, keyPressedOnceHandler, platformController) {
        super('playerControlSystem', eventManager);
        this.keyPressedOnceHandler = keyPressedOnceHandler;
        this.platformController = platformController;

        this.vipMode = false;
        this.vipJumps = 0;
        this.maxVipJumps = 250;
        this.autoJumpTick = 0;

        console.log('playercontrol system event manager:', this.eventManager);
    }

    update() {
        // How can we display ␣ is the jump key at the start...?

        const eCamera = this.entityManager.queryTag(Constants.CAMERA_TAG)[0];

        const player = this.entityManager.queryTag(Constants.PLAYER_TAG)[0];
        // console.log('player direction:', player.character.getDirection());
        // console.log('player sprite:', player.sprite.getImage());

        if (
            Math.abs(player.offset.getYOffset()) <= 1 &&
            Math.abs(player.offset.getXOffset()) <= 1
        ) {
            player.image.setImage(
                DirectionSpriteMap[player.character.getDirection()]
            );
        } else {
            player.image.setImage(
                JumpDirectionSpriteMap[player.character.getDirection()]
            );
        }

        let currentPlatformNode = this.platformController.getCurrentPlatform();
        // console.log('platform controller:', this.platformController);

        if (this.vipMode == false) {
            if (this.keyPressedOnceHandler.isPressed(' ')) {
                let nextPlatformNode = currentPlatformNode.next;
                let playerDirection = player.character.getDirection();

                // console.log('next platform node:', nextPlatformNode);
                // console.log('player direction:', playerDirection);
                // console.log('direction velocity map:', DirectionVelocityMap);

                if (
                    nextPlatformNode.relativePosition !=
                    DirectionVelocityMap[playerDirection]
                ) {
                    this.eventManager.emit(new PlayerDied());
                    // TODO: Come up with an easy way to emit some kind of restart event
                    alert('failure!');
                } else {
                    // Update camera offset
                    eCamera.camera.setXOffset(
                        eCamera.camera.getXOffset() +
                            Constants.PLATFORM_X_DISTANCE_FACTOR *
                                nextPlatformNode.relativePosition
                    );
                    eCamera.camera.setYOffset(
                        eCamera.camera.getYOffset() -
                            Constants.PLATFORM_Y_DISTANCE_FACTOR
                    );

                    // Update player offset
                    player.offset.setXOffset(
                        player.offset.getXOffset() +
                            Constants.PLATFORM_X_DISTANCE_FACTOR *
                                nextPlatformNode.relativePosition
                    );
                    player.offset.setYOffset(
                        player.offset.getYOffset() -
                            Constants.PLATFORM_Y_DISTANCE_FACTOR
                    );

                    this.platformController.moveCurrentUp();
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
                    this.eventManager.emit(new PlayerDied());
                    // TODO: Come up with an easy way to emit some kind of restart event
                    alert('failure!');
                } else {
                    // Update camera offset
                    eCamera.camera.setXOffset(
                        eCamera.camera.getXOffset() +
                            Constants.PLATFORM_X_DISTANCE_FACTOR *
                                nextPlatformNode.relativePosition
                    );
                    eCamera.camera.setYOffset(
                        eCamera.camera.getYOffset() -
                            Constants.PLATFORM_Y_DISTANCE_FACTOR
                    );

                    // Update player offset
                    player.offset.setXOffset(
                        player.offset.getXOffset() +
                            Constants.PLATFORM_X_DISTANCE_FACTOR *
                                nextPlatformNode.relativePosition
                    );
                    player.offset.setYOffset(
                        player.offset.getYOffset() -
                            Constants.PLATFORM_Y_DISTANCE_FACTOR
                    );

                    this.platformController.moveCurrentUp();

                    player.stats.setHeight(player.stats.getHeight() + 1);

                    if (
                        this.platformController.getCurrentPlatform()
                            .itemEntity != null
                    ) {
                        player.stats.setCoins(player.stats.getCoins() + 5);
                        this.platformController.getCurrentPlatform().itemEntity =
                            null;
                    }
                }
            } else if (this.keyPressedOnceHandler.isPressed('z')) {
                console.log('test');
                this.vipMode = true;
            }
        } else {
            this.autoJumpTick = (this.autoJumpTick + 1) % 20;
            if (this.autoJumpTick == 0) {
                if (this.vipJumps < this.maxVipJumps) {
                    ++this.vipJumps;

                    let nextPlatformNode = currentPlatformNode.next;
                    // let playerDirection = player.character.getDirection();

                    player.character.setDirection(
                        VelocityDirectionMap[nextPlatformNode.relativePosition]
                    );

                    eCamera.camera.setXOffset(
                        eCamera.camera.getXOffset() +
                            Constants.PLATFORM_X_DISTANCE_FACTOR *
                                nextPlatformNode.relativePosition
                    );
                    eCamera.camera.setYOffset(
                        eCamera.camera.getYOffset() -
                            Constants.PLATFORM_Y_DISTANCE_FACTOR
                    );

                    // Update player offset
                    player.offset.setXOffset(
                        player.offset.getXOffset() +
                            Constants.PLATFORM_X_DISTANCE_FACTOR *
                                nextPlatformNode.relativePosition
                    );
                    player.offset.setYOffset(
                        player.offset.getYOffset() -
                            Constants.PLATFORM_Y_DISTANCE_FACTOR
                    );

                    this.platformController.moveCurrentUp();

                    player.stats.setHeight(player.stats.getHeight() + 1);

                    if (
                        this.platformController.getCurrentPlatform()
                            .itemEntity != null
                    ) {
                        player.stats.setCoins(player.stats.getCoins() + 5);
                        this.platformController.getCurrentPlatform().itemEntity =
                            null;
                    }
                } else {
                    this.vipMode = false;
                }
            }
        }
    }
}
