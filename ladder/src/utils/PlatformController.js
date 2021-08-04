import { Image } from '../components/Image';
import { Position } from '../components/Position';
import { Animatable } from '../components/Animatable';
import { Box } from '../components/Box';
import {
    CoinAnimationFactory,
    CoinType,
} from '../factories/CoinAnimationFactory';
import { Text } from '../components/Text';
import { Offset } from '../components/Offset';
import { Velocity } from '../components/Velocity';

export class PlatformNode {
    constructor(
        relativePosition,
        platformEntity,
        itemEntity = null,
        prevNode = null
    ) {
        this.relativePosition = relativePosition;
        this.platformEntity = platformEntity;
        this.itemEntity = itemEntity;
        this.prev = prevNode;
        this.next = null;
    }
}

export class PlatformController {
    constructor(entityManager, imagemap) {
        this.entityManager = entityManager;

        this.coinAnimationFactory = new CoinAnimationFactory(imagemap);

        this.currentPlatform = null;
        this.head = null;
        this.tail = null;
    }

    addPlatform(amount = 1) {
        let counter = 0;
        while (counter < amount) {
            // TODO: Use a consistent seed for this
            let relativePosition = Math.round(Math.random()) ? 1 : -1;

            let hasCoin = Math.round(Math.random() * 100) % 10 == 0;

            let node = new PlatformNode(
                relativePosition,
                this.createPlatformEntity(),
                hasCoin ? this.createCoinEntity() : null
            );

            if (this.head == null && this.tail == null) {
                this.head = node;
                this.tail = this.head;
            } else {
                this.tail.next = node;
                this.tail = this.tail.next;
            }

            ++counter;
        }

        if (this.currentPlatform == null) {
            this.currentPlatform = this.head;
        }
    }

    removeBottomPlatform() {
        this.head = this.head.next;

        this.addPlatform();
    }

    getBottomPlatform() {
        return this.head;
    }

    getCurrentPlatform() {
        return this.currentPlatform;
    }

    moveCurrentUp() {
        this.currentPlatform = this.currentPlatform.next;

        this.addPlatform();

        return this.currentPlatform;
    }

    createPlatformEntity() {
        // Create a platform
        let platform = this.entityManager.createEntity();
        // TODO: Create a constant for this
        platform.addTag('platform');

        platform.addComponent(Image);
        platform.addComponent(Position);
        platform.addComponent(Box);

        platform.image.setImage('platform.png');
        // TODO: Read these values from the image
        platform.box.setWidth(64);
        platform.box.setHeight(16);

        return platform;
    }

    createCoinEntity() {
        let coin = this.entityManager.createEntity();
        coin.addTag('coin');

        coin.addComponent(Animatable);
        coin.addComponent(Position);
        coin.animatable.setAnimation(
            this.coinAnimationFactory.getCoin(CoinType.GOLD)
        );

        return coin;
    }

    createTextEntity(message) {
        console.log('creating text entity with message:', message);

        let text = this.entityManager.createEntity();
        text.addTag('text');

        text.addComponent(Text);
        text.addComponent(Position);
        text.addComponent(Offset);
        text.addComponent(Velocity);

        text.velocity.setVelocityY(-1.5);
        // TODO: Figure out why not doing this results in x being NaN
        text.velocity.setVelocityX(0);
        text.text.setMessage(message);

        return text;
    }
}
