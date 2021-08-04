// var Component = require('./Component');
// var System = require('./System');

// var RenderSystem = require('./systems/RenderSystem');

// var Sprite = require('./components/Sprite');

// import { Sprite } from './components/Sprite';
// import { Position } from './components/Position';
// import { Velocity } from './components/Velocity';
// import { Moveable } from './components/Moveable';
// import { Collideable } from './components/Collideable';

import { Game } from './Game';
import { KeyHandler } from './utils/KeyHandler';
// import { Vector2 } from './system/Vector2';

// Doesn't support ES6 imports: https://github.com/bramstein/fontfaceobserver/issues/102
let FontFaceObserver = require('fontfaceobserver');

// var f = new FontFace('04b03', 'url("resources/fonts/04b03.ttf")');

// // //console.log(f);
// // // try {
// // //     f.load();
// // // } catch (e) {
// // //     console.log(e);
// // // }

// f.load().then(function (font) {
//     // Ready to use the font in a canvas context
//     console.log('mcready');

//     // Add font on the html page
//     document.fonts.add(font);

//     // ctx.font = '48px Font name';
//     // ctx.strokeText('Hello world', 100, 100);
// });

// TODO: Auto load these...
var imageStrings = [
    'character.png',
    'character-left.png',
    'character-jump.png',
    'character-jump-left.png',
    'circle-medium.png',
    'circle-small.png',
    'platform.png',
    'menu-background.png',
    'parallax-mountain-mountain-far.png',
    'parallax-mountain-mountains.png',
    'sky-background.png',
    'clouds.png',
    'coin-gold.png',
    'coin-silver.png',
];

var IMAGEMAP_ = {};

// console.log(new Vector2());

function loadImages(fileNames, callback) {
    var count = fileNames.length;
    var onload = function () {
        if (--count == 0) {
            callback(IMAGEMAP_);
        }
    };

    for (var i = 0; i < fileNames.length; ++i) {
        var fileName = fileNames[i];

        IMAGEMAP_[fileName] = document.createElement('img');
        IMAGEMAP_[fileName].addEventListener('load', onload);
        IMAGEMAP_[fileName].src = 'resources/images/' + fileName;
    }
}

const keyPressedOnceHandler = new KeyHandler();

let previousKeyDownMap = new Map();
let currentKeyDownMap = new Map();

document.addEventListener('keydown', function (event) {
    keyPressedOnceHandler.updateKey(event.key, true);
});

const canvas = document.getElementById('ladderGame');

function main(imagemap) {
    var game = new Game(keyPressedOnceHandler, canvas);

    game.init(imagemap);
    game.run();
}

var font = new FontFaceObserver('04b03');

// Might be nice to add loading text during this in case their connection is slow
font.load().then(function () {
    console.log('mcloaded');
    loadImages(imageStrings, main);
});
