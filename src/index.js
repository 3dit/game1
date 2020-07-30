import * as PIXI from 'pixi.js';

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application();

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

let myGame = (loader,resources) => {
    // This creates a texture from a 'bunny.png' image
    const bunny = new PIXI.Sprite(resources.bunny.texture);

    // Setup the position of the bunny
    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2;

    // Rotate around the center
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    let x = 200;
    let y = 250;
    let xv = 2.5;
    let yv = 1.9;
    let width = 800;
    let height = 600;

    // Add the bunny to the scene we are building
    app.stage.addChild(bunny);

    // Listen for frame updates
    app.ticker.add(function run() {
         // each frame we spin the bunny around a bit
        bunny.rotation += 0.01;

        if(x + xv + bunny.width/2 > width) {
          xv = -xv;
        } else if(x + xv  < bunny.width/2) {
          xv = -xv;
        }
        x = x + xv;

        if(y + yv + bunny.height/2 > height) {
          yv =- yv;
        } else if(y + yv < bunny.height/2) {
          yv = -yv;
        }
        y += yv;

        bunny.x = x;
        bunny.y = y;
    });

}

// load the texture we need
let appLoader = app.loader;
appLoader.add('bunny', 'test.png');
appLoader.load(myGame);