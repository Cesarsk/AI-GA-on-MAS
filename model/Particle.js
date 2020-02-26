function drawFood() {
    for (var i = 0; i < food.length; i++) {
        fill("#35ce16");
        noStroke();

        // draw a circle
        ellipse(food[i].x, food[i].y, 5, 5);
    }
}

function drawPoison() {
    for (var i = 0; i < poison.length; i++) {
        fill("#ff2b2b");
        noStroke();

        //draw a cross
        rect(poison[i].x, poison[i].y, 5, 1);
        rect(poison[i].x+2, poison[i].y-2, 1, 5);
    }
}

function generateFood() {
    // random food generation
    if (random(1) < 0.3) {
        for (var i = 0; i < randomFoodGeneration; i++) {
            food.push(createVector(random(frameWidth - 20) + 10, random(frameHeight - 20) + 10));
        }
    }
}

function generatePoison() {
    // random poison generation
    if (random(1) < 0.3) {
        for (var i = 0; i < randomPoisonGeneration; i++) {
            poison.push(createVector(random(frameWidth - 20) + 10, random(frameHeight - 20) + 10));
        }
    }
}