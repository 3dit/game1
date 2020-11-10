export { isCollidingWith, getPushDirection, applyForce }

function isCollidingWith(sprite1, sprite2) {
    let topLeftInRect = pointInRect(sprite1.x, sprite1.y, sprite2);
    let topRightInRect = pointInRect(sprite1.x + sprite1.width, sprite1.y, sprite2);
    let bottomLeftInRect = pointInRect(sprite1.x, sprite1.y + sprite1.height, sprite2);
    let bottomRightInRect = pointInRect(sprite1.x + sprite1.width, sprite1.y + sprite1.height, sprite2);
    let sprite1InsideSprite2 = totalyInside(sprite1, sprite2);
    let sprite2InsideSprite1 = totalyInside(sprite2, sprite1);

    return topLeftInRect || topRightInRect || bottomLeftInRect || bottomRightInRect || sprite1InsideSprite2 || sprite2InsideSprite1;
}

function totalyInside(sprite1, sprite2)
{
    return  sprite1.x > sprite2.x && sprite1.x+sprite1.width < sprite2.x+sprite2.width && sprite1.y > sprite2.y && sprite1.y + sprite1.width < sprite2.y + sprite2.width;
}

function pointInRect(sprite1x, sprite1y, sprite2) {
    if (sprite1x > sprite2.x && sprite1x < sprite2.x + sprite2.width && sprite1y > sprite2.y && sprite1y < sprite2.y + sprite2.height) return true;
}

function getPushDirection(sprite1, sprite2) {
    let center1x = (sprite1.x + sprite1.x + sprite1.width / 2);
    let center1y = (sprite1.y + sprite1.y + sprite1.height / 2);
    let center2x = (sprite2.x + sprite2.x + sprite2.width / 2);
    let center2y = (sprite2.y + sprite2.y + sprite2.height / 2);
    let dx = center2x - center1x;
    let dy = center2y - center1y;
    let angle = Math.atan2(dx, dy);
    return angle;
}

function applyForce(sprite, angle, force) {
    if (sprite.length) {
        sprite[1].x += Math.sin(angle) * force;
        sprite[1].y += Math.cos(angle) * force;
        for (var i = 1; i < sprite.length; i++) {
            if (sprite[i]) {
                sprite[i].x = sprite[1].x;
                sprite[i].y = sprite[1].y;
            }
        }
    } else {
        sprite.x += Math.sin(angle) * force;
        sprite.y += Math.cos(angle) * force;
    }
}