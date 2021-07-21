import { Rectangle } from '../shapes/Rectangle';

import { Animation } from '../graphics/Animation';
import { Frame } from '../graphics/Frame';
import { Sprite } from '../graphics/Sprite';

export const CoinType = {
    GOLD: 'GOLD',
    SILVER: 'SILVER',
};

export const CoinTypeToImageMap = {
    GOLD: 'coin-gold.png',
    SILVER: 'coin-silver.png',
};

export class CoinAnimationFactory {
    constructor(imagemap) {
        this.imagemap = imagemap;
        this.coins = {};
    }

    getCoin(type) {
        return this.createCoin(type);

        // Can't reuse the same animation because we keep track of the
        // current frame there... We CAN reuse the same sprites/frames tho
        // if (this.coins[type] == undefined) {
        //     this.coins[type] = this.createCoin(type);
        // }

        // return this.coins[type];
    }

    createCoin(type) {
        const coinSprite1 = new Sprite(
            this.imagemap[CoinTypeToImageMap[type]],
            new Rectangle(0, 0, 16, 16)
        );
        const coinSprite2 = new Sprite(
            this.imagemap[CoinTypeToImageMap[type]],
            new Rectangle(16, 0, 16, 16)
        );
        const coinSprite3 = new Sprite(
            this.imagemap[CoinTypeToImageMap[type]],
            new Rectangle(32, 0, 16, 16)
        );
        const coinSprite4 = new Sprite(
            this.imagemap[CoinTypeToImageMap[type]],
            new Rectangle(48, 0, 16, 16)
        );
        const coinSprite5 = new Sprite(
            this.imagemap[CoinTypeToImageMap[type]],
            new Rectangle(64, 0, 16, 16)
        );

        const coinFrame1 = new Frame(20, [coinSprite1]);
        const coinFrame2 = new Frame(20, [coinSprite2]);
        const coinFrame3 = new Frame(20, [coinSprite3]);
        const coinFrame4 = new Frame(20, [coinSprite4]);
        const coinFrame5 = new Frame(20, [coinSprite5]);

        const coinAni = new Animation(true, [
            coinFrame1,
            coinFrame2,
            coinFrame3,
            coinFrame4,
            coinFrame5,
        ]);

        return coinAni;
    }
}
