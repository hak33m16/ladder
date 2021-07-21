import { System } from '../System';

import { Position } from '../components/Position';
import { Collideable } from '../components/Collideable';
import { Velocity } from '../components/Velocity';
import { Animatable } from '../components/Animatable';

import { PlayerDied } from '../events/PlayerDied';

import * as Constants from '../Constants';
import { Vector2 } from '../system/Vector2';

export class RenderSystem extends System {
    constructor(eventManager, context, canvas, platformController, imagemap) {
        super('renderSystem', eventManager);
        this.context = context;
        this.canvas = canvas;
        this.platformController = platformController;
        this.imagemap = imagemap;
        this.cameraVelocity = 1;
        this.backgroundPosition = 0;

        this.screenCenterX = this.canvas.width / 2 / Constants.SCALE;
        this.screenCenterY = this.canvas.height / 2 / Constants.SCALE;
        this.screenHeight = this.canvas.height / Constants.SCALE;
        this.screenWidth = this.canvas.width / Constants.SCALE;

        this.mountainPosition = 0;
        // this.mountain2Position = 0;
        this.mountainWidth = 500 / Constants.SCALE;
        this.mountainHeight = 160;

        this.cloudSpeed = 0.1;
        this.cloudX = 0;
        this.cloudXPosition = 0;
        // this.cloudY = 0;
        this.cloudYPosition = 0;

        this.eventManager.subscribe(
            PlayerDied,
            this.handlePlayerDied.bind(this)
        );
    }

    handlePlayerDied(eventObj) {
        console.log('player died:', eventObj);
        // console.log('are we in the correct this?:', this.mountainPosition);
    }

    drawBackground(camera) {
        this.context.drawImage(this.imagemap['sky-background.png'], 0, 0);

        // this.context.scale(2, 2);
        const mountainScale = 0.001;
        const cloudXScale = 0.0015;
        const cloudYScale = 0.0005;

        this.mountainPosition -= camera.getXOffset() * mountainScale;
        // this.mountain2Position += camera.getXOffset() * mountainScale;
        this.cloudXPosition -= camera.getXOffset() * cloudXScale;
        this.cloudYPosition -= camera.getYOffset() * cloudYScale;

        // console.log(this.mountain1Position);

        this.context.drawImage(
            this.imagemap['parallax-mountain-mountain-far.png'],
            this.mountainPosition,
            this.screenHeight - this.mountainHeight
        );
        this.context.drawImage(
            this.imagemap['parallax-mountain-mountain-far.png'],
            this.mountainPosition + this.mountainWidth,
            this.screenHeight - this.mountainHeight
        );

        let mountainMultiplier = 0;
        if (this.mountainPosition < 0) {
        }
        this.context.drawImage(
            this.imagemap['parallax-mountain-mountain-far.png'],
            this.mountainPosition + this.mountainWidth * 2,
            this.screenHeight - this.mountainHeight
        );

        this.cloudX += this.cloudSpeed;
        this.context.drawImage(
            this.imagemap['clouds.png'],
            this.cloudX + this.cloudXPosition,
            this.cloudYPosition
        );
        this.context.drawImage(
            this.imagemap['clouds.png'],
            this.cloudX + this.cloudXPosition - this.screenWidth,
            this.cloudYPosition
        );
    }

    drawHud(player) {
        this.context.textAlign = 'left';
        this.context.font = '14px "04b03"';

        this.context.fillStyle = 'black';
        this.context.fillText('Height: ' + player.stats.getHeight(), 10, 17);
        this.context.fillStyle = 'white';
        this.context.fillText('Height: ' + player.stats.getHeight(), 11, 18);

        this.context.fillStyle = 'black';
        this.context.fillText('Stamina', 10, this.screenHeight - 25);
        this.context.fillStyle = 'white';
        this.context.fillText('Stamina', 11, this.screenHeight - 24);

        this.context.drawImage(
            this.imagemap['coin-gold.png'],
            0,
            0,
            16,
            16,
            this.screenWidth - 80,
            6,
            16,
            16
        );

        this.context.fillStyle = 'black';
        this.context.fillText(
            player.stats.getCoins(),
            this.screenWidth - 60,
            17
        );
        this.context.fillStyle = 'white';
        this.context.fillText(
            player.stats.getCoins(),
            this.screenWidth - 59,
            18
        );
    }

    drawAnimations() {
        var candidates = this.entityManager.queryComponents([
            Animatable,
            Position,
        ]);

        candidates.forEach((entity) => {
            entity.animatable
                .getAnimation()
                // TODO: Consider having the animation draw function just take a
                // position directly so we don't have to create intermediary classes
                .setPosition(new Vector2(entity.position.x, entity.position.y));
            entity.animatable.getAnimation().draw(this.context);
        });
    }

    // drawLevel() {

    // }

    update(dt) {
        const eCamera = this.entityManager.queryTag('camera')[0];
        const player = this.entityManager.queryTag('player')[0];

        this.drawBackground(eCamera.camera);

        const drawStatic = function (entity, context, imagemap) {
            context.drawImage(
                imagemap[entity.image.getImage()],
                Math.floor(
                    entity.position.getX() + eCamera.camera.getXOffset()
                ),
                Math.floor(entity.position.getY() + eCamera.camera.getYOffset())
            );
        };

        const drawAnimationStatic = function (entity, context) {
            entity.animatable
                .getAnimation()
                .setPosition(
                    new Vector2(
                        Math.floor(
                            entity.position.getX() + eCamera.camera.getXOffset()
                        ),
                        Math.floor(
                            entity.position.getY() + eCamera.camera.getYOffset()
                        )
                    )
                );
            entity.animatable.getAnimation().draw(context);
        };

        let playerPlatformNode = this.platformController.getCurrentPlatform();

        let currentPlatformNode = this.platformController.getCurrentPlatform();

        const platformStartingX = Math.floor(
            this.screenCenterX -
                currentPlatformNode.platformEntity.box.getWidth() / 2
        );
        const platformStartingY = Math.floor(
            this.screenHeight -
                currentPlatformNode.platformEntity.box.getHeight()
        );
        let platformsDrawn = 0;

        let playerPlatformXPosition = 0;
        let playerPlatformYPosition = 0;

        let currentPlatformX = platformStartingX;
        let currentPlatformY = platformStartingY;
        while (platformsDrawn < 15) {
            ++platformsDrawn;

            if (currentPlatformNode == playerPlatformNode) {
                playerPlatformXPosition = currentPlatformX;
                playerPlatformYPosition = currentPlatformY;
            }

            let platformEntity = currentPlatformNode.platformEntity;
            let platformItemEntity = currentPlatformNode.itemEntity;

            platformEntity.position.setX(currentPlatformX);
            platformEntity.position.setY(currentPlatformY);

            if (platformItemEntity != null) {
                platformItemEntity.position.setX(currentPlatformX + 24);
                platformItemEntity.position.setY(currentPlatformY - 20);

                drawAnimationStatic(
                    platformItemEntity,
                    this.context,
                    this.imagemap
                );
            }

            drawStatic(platformEntity, this.context, this.imagemap);

            currentPlatformNode = currentPlatformNode.next;

            if (!currentPlatformNode) {
                break;
            }

            currentPlatformY -= Constants.PLATFORM_Y_DISTANCE_FACTOR;
            // Draw to the left or right of the current one
            currentPlatformX +=
                Constants.PLATFORM_X_DISTANCE_FACTOR *
                currentPlatformNode.relativePosition;
        }

        // this.drawAnimations();

        player.position.setX(playerPlatformXPosition + 16);
        player.position.setY(playerPlatformYPosition - 48);

        const lerp = (a, b, x) => {
            return a + x * (b - a);
        };

        const percentage = 0.15;

        // lerp camera
        eCamera.camera.setXOffset(
            lerp(eCamera.camera.getXOffset(), 0, percentage)
        );
        eCamera.camera.setYOffset(
            lerp(eCamera.camera.getYOffset(), 0, percentage)
        );

        // lerp player
        player.offset.setXOffset(lerp(player.offset.getXOffset(), 0, 0.3));
        player.offset.setYOffset(lerp(player.offset.getYOffset(), 0, 0.3));

        //drawStatic(player, this.context, this.imagemap);
        // custom draw required for player
        this.context.drawImage(
            this.imagemap[player.image.getImage()],
            Math.floor(
                player.position.getX() +
                    eCamera.camera.getXOffset() -
                    player.offset.getXOffset()
            ),
            Math.floor(
                player.position.getY() +
                    eCamera.camera.getYOffset() -
                    player.offset.getYOffset()
            )
        );

        this.drawHud(player);
    }
}
