import { GameState } from '../Game';
import { Menu } from './Menu';

import * as Constants from '../Constants';

const Selection = {
    START: 'START',
    SETTINGS: 'SETTINGS',
};

export class MainMenu extends Menu {
    constructor(keyPressedOnceHandler, setGameState) {
        super(keyPressedOnceHandler, setGameState);
        this.backgroundImage = 'menu-background.png';
        this.headerText = 'LADDER';
        this.startText = 'Start';
        this.settingsText = 'Settings';
        this.versionText = 'v0.0.0.0.1 :: Pre-Pre Alpha';
        this.selection = Selection.START;
    }

    draw(context, canvas, imagemap) {
        const centerX = canvas.width / 2 / Constants.SCALE;
        const centerY = canvas.height / 2 / Constants.SCALE;

        context.drawImage(
            imagemap[this.backgroundImage],
            centerX - imagemap[this.backgroundImage].width / 2,
            centerY - imagemap[this.backgroundImage].height / 2
        );

        context.textAlign = 'center';
        context.font = '64px "04b03"';

        context.lineWidth = 2;
        context.strokeText(this.headerText, centerX, centerY - 75);
        context.lineWidth = 1;
        context.fillText(this.headerText, centerX, centerY - 75);

        context.font = '28px "04b03"';

        if (this.selection == Selection.START) {
            context.lineWidth = 2;
            context.strokeText(
                new Array(this.startText.length + 1).join('_'),
                centerX,
                centerY + 25
            );

            context.lineWidth = 1;
            context.fillText(
                new Array(this.startText.length + 1).join('_'),
                centerX,
                centerY + 25
            );
        }

        context.lineWidth = 2;
        context.strokeText(this.startText, centerX, centerY + 25);
        context.lineWidth = 1;
        context.fillText(this.startText, centerX, centerY + 25);

        if (this.selection == Selection.SETTINGS) {
            context.lineWidth = 2;
            context.strokeText(
                new Array(this.settingsText.length + 1).join('_'),
                centerX,
                centerY + 60
            );

            context.lineWidth = 1;
            context.fillText(
                new Array(this.settingsText.length + 1).join('_'),
                centerX,
                centerY + 60
            );
        }

        context.lineWidth = 2;
        context.strokeText(this.settingsText, centerX, centerY + 60);
        context.lineWidth = 1;
        context.fillText(this.settingsText, centerX, centerY + 60);
    }

    update() {
        // console.log(this.keyPressedOnceHandler);
        // throw new Error("Method 'update' must be implemented")
        if (this.keyPressedOnceHandler.isPressed('ArrowUp')) {
            this.onUp();
        } else if (this.keyPressedOnceHandler.isPressed('ArrowDown')) {
            this.onDown();
        }

        if (this.keyPressedOnceHandler.isPressed('Enter')) {
            this.onConfirm();
        }
    }

    onConfirm() {
        if (this.selection == Selection.START) {
            console.log('state mcchanged');
            this.setGameState(GameState.PLAYING);
        }
    }
    onCancel() {
        // throw new Error("Method 'onCancel' must be implemented")
    }
    onUp() {
        if (this.selection == Selection.SETTINGS) {
            this.selection = Selection.START;
        } else {
            this.selection = Selection.SETTINGS;
        }
    }
    onDown() {
        if (this.selection == Selection.SETTINGS) {
            this.selection = Selection.START;
        } else {
            this.selection = Selection.SETTINGS;
        }
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
