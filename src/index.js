import * as PIXI from 'pixi.js';

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application();

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

let myGame = (loader,resources) => {
    // This creates a texture from a 'test.png' image
    const dude = new PIXI.Sprite(resources.dude.texture);

    // Setup the position of the dude
    dude.x = app.renderer.width / 2;
    dude.y = app.renderer.height / 2;

    // Rotate around the center
    dude.anchor.x = 0.5;
    dude.anchor.y = 0.5;

    // Add the dude to the scene we are building
    app.stage.addChild(dude);

    // Listen for frame updates
    app.ticker.add(function run() {
         // each frame we spin the dude around a bit
        dude.rotation += 0.01;
    });

}

// load the texture we need
let appLoader = app.loader;
appLoader.add('dude', 'test.png');
appLoader.load(myGame);