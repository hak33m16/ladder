export class KeyHandler {
    constructor() {
        this.keyMap = new Map();
    }

    updateKey(key, isPressed) {
        this.keyMap.set(key, isPressed);
    }

    isPressed(key) {
        return this.keyMap.get(key) === true;
    }

    clear() {
        this.keyMap.clear();
    }
}
