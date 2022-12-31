import * as PIXI from 'pixi.js';
import { isCollidingWith, getPushDirection, applyForce } from './collider.js';

let app = new PIXI.Application({
    width: 800, height: 600, backgroundColor: 0xf2e999, resolution: window.devicePixelRatio || 1,
});

console.log('app',app);
console.log('%cWelcome Back!', 'font-size:20px;font-weight:bold;color:green;');

let dude = '';
let coin = '';
let guy = [];
let guy_counter = 1;
let tomfarm = '';
let tv = '';
let haybale = '';
let cactus = '';

document.body.appendChild(app.view);

document.addEventListener('keydown', doKeyEvent);

//PIXI.settings.SCALE_MODE = 2;

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
app.stage.sortableChildren = true;

let gameStartupFunction = function (loader, resources) {
    dude = new PIXI.Sprite(resources.dude.texture);
    coin = new PIXI.Sprite(resources.coin.texture);
    guy[1] = new PIXI.Sprite(resources.guy1.texture);
    guy[2] = new PIXI.Sprite(resources.guy2.texture);
    tomfarm = new PIXI.Sprite(resources.tomfarm.texture);
    tv = new PIXI.Sprite(resources.tv.texture);
    haybale = new PIXI.Sprite(resources.haybale.texture);
    cactus = new PIXI.Sprite(resources.cactus.texture);

    dude.roundPixels = true;

    dude.x = 100;
    dude.y = 600;
    dude.anchor.x = 0.5;
    dude.anchor.y = .5;
    dude.width = 50;
    dude.height = 100;
    dude.zIndex = 10;

    tv.x = 400;
    tv.y = 100;
    tv.width = 150;
    tv.height = 150;
    tv.zindex = 2;
    tv.anchor.x = .5;
    tv.anchor.y = .5;

    cactus.x = 400;
    cactus.y = 300;
    cactus.width = 50;
    cactus.height = 82;

    let cactusGrowthRate = .009;
    let cactusUpdateRate = 300;
    setInterval(() => { cactus.height+=cactusGrowthRate; cactus.y-=cactusGrowthRate;},cactusUpdateRate);

    haybale.x = -20;
    haybale.y = 150;
    haybale.width = 200;
    haybale.height = 200;
    haybale.zIndex = 2;

    coin.x = app.renderer.width / 6;
    coin.y = app.renderer.height / 6;
    coin.anchor.x = 0.5;
    coin.anchor.y = 0.5;
    coin.width = 15;
    coin.height = 15;
    coin.zIndex = 1;

    tomfarm.x = 12;
    tomfarm.y = -4;
    tomfarm.width = 240;
    tomfarm.height = 240;
    tomfarm.zIndex = 0;

    guy[1].anchor.x = .5;
    guy[1].anchor.y = .5;
    guy[2].anchor.x = .5;
    guy[2].anchor.y = .5;
    guy[1].visible = false;
    guy[2].visible = false;
    guy[1].width = guy[2].width = 23*3;
    guy[1].height = guy[2].height = 27*3;
    guy[1].x = guy[2].x = 210;
    guy[1].y = guy[2].y = 200;
    guy[1].zIndex = guy[2].zIndex = 9;

    // Add the dude to the scene we are building
    app.stage.addChild(tomfarm);
    app.stage.addChild(guy[1]);
    app.stage.addChild(guy[2]);
    app.stage.addChild(dude);
    app.stage.addChild(coin);
    app.stage.addChild(tv);
    app.stage.addChild(haybale);
    app.stage.addChild(cactus);

    // Listen for frame updates
    app.ticker.add(eventLoop);
}


// load the texture we need
app.loader.add('dude', 'Bogo_sprite_2.png');
app.loader.add('coin', 'one_coin_sprite.png');
app.loader.add('guy1', 'animated-guy1.png');
app.loader.add('guy2', 'animated-guy2.png');
app.loader.add('tomfarm', 'tomato_farm.png');
app.loader.add('tv', 'sunk_tv.png');
app.loader.add('haybale', 'hay_bale.png');
app.loader.add('cactus', 'spiky_thing.png');

app.loader.load(gameStartupFunction);

let collidingState = false;
let lastCollidingState = collidingState;

let gt1 = 50;
let gt2 = 100;
function eventLoop() {
    //dude.rotation += .01;
    guy_counter++;
    if (guy_counter == gt1) {
        //guy[1].vibisle = false;
        guy[2].visible = true;
    }
    if (guy_counter == gt1 + 1) {
        guy[1].visible = false;
    }
    if (guy_counter == gt2) {
        //guy[2].visible = false;
        guy[1].visible = true;
        //guy_counter = 0;
    }
    if (guy_counter == gt2 + 1) {
        guy[2].visible = false;
        guy_counter = 0;
    }
    if(dude.y - dude.height / 2 < guy[1].y) {
        dude.zIndex = 9;
        guy[1].zIndex = guy[2].zIndex = 10;
    }
    if(dude.y - dude.height / 2 > guy[1].y) {
        dude.zIndex = 10;
        guy[1].zIndex = guy[2].zIndex = 9;
    } 

    collidingState = isCollidingWith(dude,guy[1]);
    if(collidingState != lastCollidingState)  {
        console.log(collidingState ? 'Colliding' : 'Not');
        lastCollidingState = collidingState;
        let angle = getPushDirection(dude, guy[1]);
        applyForce(guy, angle, 5);
    }  
    
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
