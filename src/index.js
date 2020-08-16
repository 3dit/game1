import * as PIXI from 'pixi.js';

let app = new PIXI.Application({
    width: 600, height: 600, backgroundColor: 0xbebe00, resolution: window.devicePixelRatio || 1,
});

let dude = '';

let coin = '';

document.body.appendChild(app.view);

document.addEventListener('keydown', doKeyEvent);

//PIXI.settings.SCALE_MODE = 2;

 
let gameStartupFunction = function (loader, resources) {
    dude = new PIXI.Sprite(resources.dude.texture);
    coin = new PIXI.Sprite(resources.coin.texture);



    // Setup the position of the dude
    dude.x = app.renderer.width / 2;
    dude.y = app.renderer.height / 1.2;

    coin.x = app.renderer.width / 2;
    coin.y = app.renderer.height / 2;

    // Rotate around the center
    dude.anchor.x = 0.5;
    dude.anchor.y = .5;

    coin.anchor.x = 0.5;
    coin.anchor.y = 0.5;

    dude.width = 200;
    dude.height = 200;

    coin.width = 175;
    coin.height = 175;

    // Add the dude to the scene we are building
    app.stage.addChild(dude);

    app.stage.addChild(coin);

    // Listen for frame updates
    app.ticker.add(eventLoop);
}


// load the texture we need
app.loader.add('dude', 'Bogo_sprite_2.png');
app.loader.add('coin', 'one_coin_sprite.png');
app.loader.load(gameStartupFunction);

function eventLoop() {
    //dude.rotation += .01;

}

let speed = 20;

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
