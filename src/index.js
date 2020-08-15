import * as PIXI from 'pixi.js';

let app = new PIXI.Application();
let dude = '';


document.body.appendChild(app.view);

document.addEventListener('keydown', doKeyEvent);


let myGame = function (loader, resources) {
    dude = new PIXI.Sprite(resources.dude.texture);


    // Setup the position of the dude
    dude.x = app.renderer.width / 2;
    dude.y = app.renderer.height / 1.2;

    // Rotate around the center
    dude.anchor.x = 0.5;
    dude.anchor.y = .5;

    // Add the dude to the scene we are building
    app.stage.addChild(dude);

    // Listen for frame updates
    app.ticker.add(eventLoop);
}

// load the texture we need
app.loader.add('dude', 'test.png');
app.loader.load(myGame);

function eventLoop() {
    //dude.rotation += .01;

}

let speed = 42;

function doKeyEvent(event) {
    if (event.key == "d") {
        dude.x += speed;
        if (dude.x > app.renderer.width) {
            dude.x -= app.renderer.width;
        }
    }
    if (event.key == "a") {
        dude.x -= speed;
        if (dude.x < 0) {
            dude.x += app.renderer.width;
        }
    }
    if (event.key == "w") {
        dude.y -= speed;
        if (dude.y < 0) {
            dude.y += app.renderer.height;
        }
    }
    if (event.key == "s") {
        dude.y += speed;
        if (dude.y > app.renderer.height) {
            dude.y -= app.renderer.height;
        }
    }
}
