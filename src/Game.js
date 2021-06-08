var nano = require('nano-ecs');

import { MovementSystem } from './systems/MovementSystem';
import { RenderSystem } from './systems/RenderSystem';

export class Game {
    constructor() {
        this.canvas = document.getElementById('ladderGame');

        this.context = this.canvas.getContext('2d');
        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        //this.context.scale(2, 2);

        //this.running = true;

        this.systems = [];

        this.lastRender = 0;
        this.entityManager = nano();
    }

    init(imagemap) {
        this.addSystem(new MovementSystem());
        this.addSystem(new RenderSystem(this.context, imagemap));
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
    }

    run() {
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        window.requestAnimationFrame(this.loop.bind(this));
    }
}
