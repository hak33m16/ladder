export class Background {
    constructor(eCamera, imagemap) {
        this.eCamera = eCamera;
        this.imagemap = imagemap;
    }

    draw(context, canvas) {
        throw new Error("Method 'draw' must be implemented");
    }

    update(dt) {
        throw new Error("Method 'update' must be implemented");
    }
}
