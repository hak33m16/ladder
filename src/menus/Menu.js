export class Menu {
    constructor(keyPressedOnceHandler, setGameState) {
        this.keyPressedOnceHandler = keyPressedOnceHandler;
        this.setGameState = setGameState;
    }

    draw(context, canvas) {
        throw new Error("Method 'draw' must be implemented");
    }

    update() {
        throw new Error("Method 'update' must be implemented");
    }

    onConfirm() {
        throw new Error("Method 'onConfirm' must be implemented");
    }
    onCancel() {
        throw new Error("Method 'onCancel' must be implemented");
    }
    onUp() {
        throw new Error("Method 'onUp' must be implemented");
    }
    onDown() {
        throw new Error("Method 'onDown' must be implemented");
    }
    onLeft() {
        throw new Error("Method 'onLeft' must be implemented");
    }
    onRight() {
        throw new Error("Method 'onRight' must be implemented");
    }
    onKey(key) {
        throw new Error("Method 'onKey' must be implemented");
    }
}
