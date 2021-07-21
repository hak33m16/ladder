var nano = require('nano-ecs');

import { MovementSystem } from './systems/MovementSystem';
import { RenderSystem } from './systems/RenderSystem';

import { Position } from './components/Position';
import { Box } from './components/Box';
import { Camera } from './components/Camera';
import { Offset } from './components/Offset';
import { Image } from './components/Image';

import { PlatformController } from './utils/PlatformController';
import { PlayerControlSystem } from './systems/PlayerControlSystem';
import { Stats } from './components/Stats';
import { Character, VelocityDirectionMap } from './components/Character';
import { Menu } from './menus/Menu';
import { MainMenu } from './menus/MainMenu';
import { MenuSystem } from './systems/MenuSystem';

import * as Constants from './Constants';
import { EventManager } from './events/EventManager';
import { AnimationSystem } from './systems/AnimationSystem';
import { Rectangle } from './shapes/Rectangle';
import { Frame } from './graphics/Frame';
import { Animation } from './graphics/Animation';
import { Sprite } from './graphics/Sprite';
import { Animatable } from './components/Animatable';

export const GameState = {
    MENU: 'MENU',
    PLAYING: 'PLAYING',
};

export class Game {
    constructor(keyPressedOnceHandler, canvas) {
        this.keyPressedOnceHandler = keyPressedOnceHandler;

        this.state = GameState.MENU;
        this.menuStack = [
            new MainMenu(this.keyPressedOnceHandler, this.setState.bind(this)),
        ];

        this.canvas = canvas;

        this.context = this.canvas.getContext('2d');
        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.scale(Constants.SCALE, Constants.SCALE);

        // Required to prevent smoothing
        this.context.webkitImageSmoothingEnabled = false;
        this.context.mozImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;

        //this.running = true;

        this.systems = [];
        this.menuSystems = [];

        this.accumulator = 0;
        this.lastRender = 0;
        this.entityManager = nano();
        this.eventManager = new EventManager();
    }

    setState(state) {
        this.state = state;
    }

    createCoinAnimation(imagemap) {
        const coinSprite1 = new Sprite(
            imagemap['coin-gold.png'],
            new Rectangle(0, 0, 16, 16)
        );
        const coinSprite2 = new Sprite(
            imagemap['coin-gold.png'],
            new Rectangle(16, 0, 16, 16)
        );
        const coinSprite3 = new Sprite(
            imagemap['coin-gold.png'],
            new Rectangle(32, 0, 16, 16)
        );
        const coinSprite4 = new Sprite(
            imagemap['coin-gold.png'],
            new Rectangle(48, 0, 16, 16)
        );
        const coinSprite5 = new Sprite(
            imagemap['coin-gold.png'],
            new Rectangle(64, 0, 16, 16)
        );
        const coinFrame1 = new Frame(120, [coinSprite1]);
        const coinFrame2 = new Frame(120, [coinSprite2]);
        const coinFrame3 = new Frame(120, [coinSprite3]);
        const coinFrame4 = new Frame(120, [coinSprite4]);
        const coinFrame5 = new Frame(120, [coinSprite5]);
        const goldCoinAni = new Animation(true, [
            coinFrame1,
            coinFrame2,
            coinFrame3,
            coinFrame4,
            coinFrame5,
        ]);
        const testCoin = this.entityManager.createEntity();
        testCoin.addComponent(Animatable);
        testCoin.addComponent(Position);
        testCoin.animatable.setAnimation(goldCoinAni);
    }

    init(imagemap) {
        // this.createCoinAnimation(imagemap);

        let platformController = new PlatformController(
            this.entityManager,
            imagemap
        );
        platformController.addPlatform(15);

        this.menuSystems.push(
            new MenuSystem(
                this.eventManager,
                this.context,
                this.canvas,
                imagemap,
                this.menuStack
            )
        );

        this.addSystem(new MovementSystem(this.eventManager));
        this.addSystem(new AnimationSystem());
        this.addSystem(
            new RenderSystem(
                this.eventManager,
                this.context,
                this.canvas,
                platformController,
                imagemap
            )
        );
        this.addSystem(
            new PlayerControlSystem(
                this.eventManager,
                this.keyPressedOnceHandler,
                platformController
            )
        );

        const PLATFORM_HEIGHT = 16;

        // Create camera

        var camera = this.entityManager.createEntity();
        camera.addTag('camera');
        camera.addComponent(Camera);

        // Create player

        var player = this.entityManager.createEntity();
        // TODO: Create constants file for tags
        player.addTag('player');

        player.addComponent(Image);
        player.addComponent(Position);
        player.addComponent(Box);
        player.addComponent(Stats);
        player.addComponent(Character);
        player.addComponent(Offset);
        console.log('Box2D class:', Box);
        console.log('player box2D:', player.box);
        console.log('player position:', player.position);

        player.image.setImage('character.png');
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
        console.log('direction velocity map:', VelocityDirectionMap);
        console.log(
            'next platform:',
            platformController.getBottomPlatform().next
        );
        player.character.setDirection(
            VelocityDirectionMap[
                platformController.getBottomPlatform().next.relativePosition
            ]
        );
    }

    getContext() {
        return this.context;
    }

    addSystem(system) {
        system.setEntityManager(this.entityManager);
        this.systems.push(system);
    }

    update(deltaTime) {
        if (this.state == GameState.MENU) {
            for (let i = 0; i < this.menuSystems.length; ++i) {
                // always display top-most menu
                this.menuSystems[i].update(
                    this.menuStack[this.menuStack.length - 1]
                );
            }
        } else if (this.state == GameState.PLAYING) {
            for (let i = 0; i < this.systems.length; ++i) {
                this.systems[i].update(deltaTime);
            }
        }
    }

    // The idea of properly separating our physics + performing interpolation
    // for rendering is kind of overwhelming. For now, if we keep the tickrate
    // at 50 on every machine, we can get away with it being smooth enough
    variableUpdate(deltaTime) {}

    loop(elapsed) {
        // tickrate in milliseconds
        const timestep = 1000 / 50;

        window.requestAnimationFrame(this.loop.bind(this));

        // elapsed is the total time we've been running
        const progress = elapsed - this.lastRender;

        this.accumulator += progress;

        let loops = 0;
        while (this.accumulator > timestep) {
            ++loops;

            this.accumulator -= timestep;
            // TODO: Move physics and input clearing here (fixedUpdate)
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.update(progress);
            this.keyPressedOnceHandler.clear();

            // This is our panic condition. If we're ever behind by this
            // many physics updates, they were probably tabbed out. Just
            // drop our desire to update altogether
            if (loops > 100) {
                console.log('panic');
                this.accumulator = 0;
                this.lastRender = elapsed;
                return;
            }
        }

        // TODO: Exclusively draw here (variableUpdate)

        this.lastRender = elapsed;
    }

    run() {
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        window.requestAnimationFrame(this.loop.bind(this));
    }
}
