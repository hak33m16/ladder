export class Vector2 {
    x;
    y;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    getX() {
        return this.x;
    }

    /**
     *
     * @param {number} x
     */
    setX(x) {
        this.x = x;
    }

    getY() {
        return this.y;
    }

    /**
     *
     * @param {number} y
     */
    setY(y) {
        this.y = y;
    }
}
