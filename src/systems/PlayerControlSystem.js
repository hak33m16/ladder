const { Howl, Howler } = require('howler');

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

        this.pickupCoinSound = new Howl({
            src: ['resources/sounds/fx/pickup-coin.wav'],
        });
        this.pickupCoinSound.volume(0.5);

        this.jumpSound = new Howl({
            src: ['resources/sounds/fx/jump.wav'],
        });

        console.log('playercontrol system event manager:', this.eventManager);
    }

    update() {
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
            if (
                this.keyPressedOnceHandler.isPressed(' ') ||
                this.keyPressedOnceHandler.isPressed('Control')
            ) {
                let intendedPlayerDirection =
                    this.keyPressedOnceHandler.isPressed('Control')
                        ? (player.character.getDirection() + 1) % 2
                        : player.character.getDirection();

                let nextPlatformNode = currentPlatformNode.next;

                // console.log('next platform node:', nextPlatformNode);
                // console.log('player direction:', playerDirection);
                // console.log('direction velocity map:', DirectionVelocityMap);

                if (
                    nextPlatformNode.relativePosition !=
                    DirectionVelocityMap[intendedPlayerDirection]
                ) {
                    this.eventManager.emit(new PlayerDied());
                    // TODO: Come up with an easy way to emit some kind of restart event
                    alert('failure!');
                } else {
                    if (this.keyPressedOnceHandler.isPressed('Control')) {
                        player.character.setDirection(intendedPlayerDirection);
                    }

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

                    this.jumpSound.volume(Math.random() * (0.35 - 0.5) + 0.35);
                    this.jumpSound.play();

                    // Instead of having the control system be responsible for this, it'd
                    // probably be more appropriate to emit some kind of collision event
                    // between the player and this coin. Another system could subscribe
                    // to collisions, and if it finds that a collision occurred between
                    // the player and an entity that it's interested in, it can be responsible
                    // for modifying stats about the player. We could use the concept of tags,
                    // and map those to other events that should happen
                    //
                    // e.g. the 'player' + 'gold-coin' tag colliding would result in an
                    // event being emitted, something like PlayerStatChangeEvent, which
                    // the StatSystem could pick up and modify the player stats from. The
                    // HUD in the RenderSystem could also watch for these events, and if
                    // it sees that the player's gold changed, add a little "+5" that fades
                    // out, below the gold counter
                    //
                    // As an aside, it'd be interesting if we handled that be holding an array
                    // of Animatable entities below that contained our desired text. We'd need
                    // a new "Image/Sprite" type of "Text", and it'd also be cool if we could
                    // add in "fading" as an Animation boolean. The AnimationSystem could clean
                    // up any fully faded animations for us
                    if (
                        this.platformController.getCurrentPlatform()
                            .itemEntity != null
                    ) {
                        player.stats.setCoins(player.stats.getCoins() + 5);
                        this.platformController.getCurrentPlatform().itemEntity =
                            this.platformController.createTextEntity('+5');

                        console.log(
                            'current platforms entity:',
                            this.platformController.getCurrentPlatform()
                                .itemEntity
                        );

                        this.pickupCoinSound.play();
                    }
                }
            } else if (this.keyPressedOnceHandler.isPressed('z')) {
                console.log('test');
                this.vipMode = true;
            }
        } else {
            this.autoJumpTick = (this.autoJumpTick + 1) % 8;
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
                        console.log('mctest2');
                        this.platformController.getCurrentPlatform().itemEntity =
                            this.platformController.createTextEntity('+5');
                    }
                } else {
                    this.vipMode = false;
                }
            }
        }
    }
}
