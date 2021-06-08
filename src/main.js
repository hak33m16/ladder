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

var imageStrings = ['character.png', 'circle-medium.png', 'circle-small.png'];

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

var createBall = function (game) {
    var ball = game.entityManager.createEntity();

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

function main(imagemap) {
    var game = new Game();
    game.init(imagemap);
    createBall(game);
    game.run();
}

//document.getElementById('button_right').addEventListener('click', createBall);

loadImages(imageStrings, main);
