import { Menu } from "./Menu"

export class MainMenu extends Menu {
    constructor() {
        super()
        this.backgroundImage = 'menu-background.png'
    }

    draw(context, canvas, imagemap) {
        context.drawImage(
            imagemap[this.backgroundImage],
            (canvas.width / 2) - (imagemap[this.backgroundImage].width / 2),
            (canvas.height / 2) - (imagemap[this.backgroundImage].height / 2)
        )
    }

    update() {
        // throw new Error("Method 'update' must be implemented")
    }

    onConfirm() {
        // throw new Error("Method 'onConfirm' must be implemented")
    }
    onCancel() {
        // throw new Error("Method 'onCancel' must be implemented")
    }
    onUp() {
        // throw new Error("Method 'onUp' must be implemented")
    }
    onDown() {
        // throw new Error("Method 'onDown' must be implemented")
    }
    onLeft() {
        // throw new Error("Method 'onLeft' must be implemented")
    }
    onRight() {
        // throw new Error("Method 'onRight' must be implemented")
    }
    onKey(key) {
        // throw new Error("Method 'onKey' must be implemented")
    }
}
