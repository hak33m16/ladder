var nano = require('nano-ecs');

import { MovementSystem } from './systems/MovementSystem';
import { RenderSystem } from './systems/RenderSystem';

import { Sprite } from './components/Sprite';
import { Position } from './components/Position';
import { Box } from './components/Box';

import { PlatformController } from './utils/PlatformController';
import { PlayerControlSystem } from './systems/PlayerControlSystem';
import { Stats } from './components/Stats';

export class Game {
    constructor(keyPressedOnceHandler) {
        this.canvas = document.getElementById('ladderGame');

        this.context = this.canvas.getContext('2d');
        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        //this.context.scale(2, 2);

        //this.running = true;

        this.systems = [];
        this.keyPressedOnceHandler = keyPressedOnceHandler;

        this.lastRender = 0;
        this.entityManager = nano();
    }

    init(imagemap) {
        let platformController = new PlatformController(this.entityManager);
        platformController.addPlatform(10);

        // console.log('platform controller:', platformController);

        this.addSystem(new MovementSystem());
        this.addSystem(
            new RenderSystem(
                this.context,
                this.canvas,
                platformController,
                imagemap
            )
        );
        this.addSystem(
            new PlayerControlSystem(
                this.keyPressedOnceHandler,
                platformController
            )
        );

        const PLATFORM_HEIGHT = 16;

        // Create player

        var player = this.entityManager.createEntity();
        // TODO: Create constants file for tags
        player.addTag('player');

        player.addComponent(Sprite);
        player.addComponent(Position);
        player.addComponent(Box);
        player.addComponent(Stats);
        console.log('Box2D class:', Box);
        console.log('player box2D:', player.box);
        console.log('player position:', player.position);
        // player.addComponent(Velocity);
        // player.addComponent(Moveable);
        // player.addComponent(Collideable);

        player.sprite.setImage('character.png');
        // TODO: Read width and height from image
        player.box.setWidth(32);
        player.box.setHeight(48);
        player.position.setX(
            Math.floor(this.canvas.width / 2 - player.box.getWidth() / 2)
        );
        player.position.setY(
            Math.floor(
                this.canvas.height - player.box.getHeight() - PLATFORM_HEIGHT
            )
        );

        // console.log(this.context.width);
        // console.log(this.context.height);
    }

    getContext() {
        return this.context;
    }

    addSystem(system) {
        system.setEntityManager(this.entityManager);
        this.systems.push(system);
    }

    update(deltaTime) {
        for (let i = 0; i < this.systems.length; ++i) {
            this.systems[i].update(deltaTime);
        }
    }

    variableUpdate(deltaTime) {}

    loop(timestamp) {
        var progress = timestamp - this.lastRender;

        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.update(progress);

        this.lastRender = timestamp;
        window.requestAnimationFrame(this.loop.bind(this));

        this.keyPressedOnceHandler.clear();
    }

    run() {
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        window.requestAnimationFrame(this.loop.bind(this));
    }
}
