// var Component = require('./Component');
// var System = require('./System');

// var RenderSystem = require('./systems/RenderSystem');

// var Sprite = require('./components/Sprite');

import { Sprite } from './components/Sprite';
import { Position } from './components/Position';
import { Velocity } from './components/Velocity';
import { Moveable } from './components/Moveable';
import { Collideable } from './components/Collideable';

import { Game } from './Game';
import { KeyHandler } from './utils/KeyHandler';

// TODO: Auto load these...
var imageStrings = [
    'character.png',
    'character-left.png',
    'circle-medium.png',
    'circle-small.png',
    'platform.png',
    'menu-background.png',
];

var IMAGEMAP_ = {};

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

//
// binding here fixes the issue of inaccessible 'this'
// still don't fully understand, and need to study more?
// https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
//

let gameRef = null;

var createBall = function () {
    var ball = gameRef.entityManager.createEntity();

    ball.addComponent(Sprite);
    ball.addComponent(Position);
    ball.addComponent(Velocity);
    ball.addComponent(Moveable);
    ball.addComponent(Collideable);

    var seed = Math.random();
    if (seed < 0.5) {
        ball.sprite.setImage('character.png');
        ball.collideable.setWidth(32);
        ball.collideable.setHeight(32);
    } else {
        ball.sprite.setImage('circle-small.png');
        ball.collideable.setWidth(16);
        ball.collideable.setHeight(16);
    }

    seed = Math.random();
    var min = 0,
        max = 280 - ball.collideable.getWidth(); // hard coded canvas size for now
    seed *= +max - +min + +min;
    ball.position.setX(seed);

    seed = Math.random();
    (min = 0), (max = 280 - ball.collideable.getHeight()); // hard coded canvas size for now
    seed *= +max - +min + +min;
    ball.position.setY(seed);

    seed = Math.random();
    (min = -1), (max = 1);
    seed *= +max - +min + +min;
    ball.velocity.setVelocityX(seed);

    seed = Math.random();
    (min = -1), (max = 1);
    seed *= +max - +min + +min;
    ball.velocity.setVelocityY(seed);

    seed = Math.random();
    (min = 1.5), (max = 6);
    seed *= +max - +min + +min;
    ball.moveable.setSpeed(seed);

    console.log(ball);
};

const keyPressedOnceHandler = new KeyHandler();

let previousKeyDownMap = new Map();
let currentKeyDownMap = new Map();

document.addEventListener('keydown', function (event) {
    // console.log('keydown event');
    // currentKeyDownMap.set(event.key, true);

    // if (previousKeyDownMap.get(event.key) !== true) {
    keyPressedOnceHandler.updateKey(event.key, true);
    // }

    // previousKeyDownMap = currentKeyDownMap;
    // currentKeyDownMap.clear();
});

// document.addEventListener('keypress')

function main(imagemap) {
    var game = new Game(keyPressedOnceHandler);
    gameRef = game;
    game.init(imagemap);
    // createBall();
    // createBall();
    game.run();
}

document.getElementById('button_right').addEventListener('click', createBall);

loadImages(imageStrings, main);
