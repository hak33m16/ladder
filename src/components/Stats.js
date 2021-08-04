import { Component } from '../Component';

export class Stats extends Component {
    constructor() {
        super('stats');

        this.height = 0;
        this.stamina = 0;
        this.coins = 0;
    }

    getHeight() {
        return this.height;
    }

    setHeight(height) {
        this.height = height;
    }

    getStamina() {
        return this.stamina;
    }

    setStamina(stamina) {
        this.stamina = stamina;
    }

    getCoins() {
        return this.coins;
    }

    setCoins(coins) {
        this.coins = coins;
    }
}
