import { System } from '../System';

import { Sprite } from '../components/Sprite';
import { Position } from '../components/Position';
import { Collideable } from '../components/Collideable';
import { Velocity } from '../components/Velocity';

export class RenderSystem extends System {
    constructor(context, canvas, platformController, imagemap) {
        super('renderSystem');
        this.context = context;
        this.canvas = canvas;
        this.platformController = platformController;
        this.imagemap = imagemap;
    }

    update() {
        const player = this.entityManager.queryTag('player')[0];

        var candidates = this.entityManager.queryComponents([
            Sprite,
            Position,
            Collideable,
            Velocity,
        ]);

        var drawStatic = function (entity, context, imagemap) {
            // console.log('mcentity:', entity);
            // console.log('mcentitys sprite:', entity.sprite);
            context.drawImage(
                imagemap[entity.sprite.getImage()],
                Math.floor(entity.position.getX()),
                Math.floor(entity.position.getY())
            );
        };

        drawStatic(player, this.context, this.imagemap);

        // console.log(
        //     'render system platform controller:',
        //     this.platformController
        // );

        let currentPlatformNode = this.platformController.getBottomPlatform();

        // console.log('render system base platform:', currentPlatformNode);

        const platformStartingX = Math.floor(
            this.canvas.width / 2 -
                currentPlatformNode.platformEntity.box.getWidth() / 2
        );
        const platformStartingY = Math.floor(
            this.canvas.height -
                currentPlatformNode.platformEntity.box.getHeight()
        );
        let platformsDrawn = 0;
        const platformYDistanceFactor = 32;
        const platformXDistanceFactor = 48;

        let currentPlatformX = platformStartingX;
        let currentPlatformY = platformStartingY;
        while (platformsDrawn < 15) {
            ++platformsDrawn;

            let platformEntity = currentPlatformNode.platformEntity;

            platformEntity.position.setX(currentPlatformX);
            platformEntity.position.setY(currentPlatformY);

            drawStatic(platformEntity, this.context, this.imagemap);

            currentPlatformNode = currentPlatformNode.next;
            // console.log('current platforms next:', currentPlatformNode);

            if (!currentPlatformNode) {
                break;
            }

            currentPlatformY -= platformYDistanceFactor;
            // Draw to the left or right of the current one
            currentPlatformX +=
                platformXDistanceFactor * currentPlatformNode.relativePosition;
        }

        const PLATFORM_HEIGHT = 16;
        player.position.setX(
            Math.floor(this.canvas.width / 2 - player.box.getWidth() / 2)
        );
        player.position.setY(
            Math.floor(
                this.canvas.height - player.box.getHeight() - PLATFORM_HEIGHT
            )
        );

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

        this.context.fillText('Height: ' + player.stats.getHeight(), 10, 10);
        this.context.fillStyle = 'black';
        this.context.fillText('Height: ' + player.stats.getHeight(), 11, 11);
        this.context.fillStyle = 'white';
    }
}
