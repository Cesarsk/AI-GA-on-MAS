class Organism {
    constructor() {
        this.fitness = 0;
        
        this.position = createVector(random(frameWidth - 20) + 10, random(frameHeight - 20) + 10);
        this.velocity = createVector(random(this.speed), random(this.speed));
        this.acceleration = createVector(0, 0);
        this.desiredPosition = createVector(random(frameWidth - 20) + 10, random(frameHeight - 20) + 10);
        
        //-----------------------------------FITNESS PARAMETERS-----------------------------------
        
        this.health = 100;
        this.force = random(1);
        this.speed = random(10);        

        this.radius = 10;
        this.sight = random(5, 35);
        
        //----------------------------------------------------------------------------------------

        this.calculateFitness = function () {
            var score = 0;
            score += this.health;
            score += this.force;
            score += this.speed;
            score += this.radius;
            score += this.sight;
            if (score > maxFitness) {
                maxFitness = score;
            }
            this.fitness = score;
        };
        
        this.randomMutation = function () {
            //randomize one of the characteristics of the organism
            var randomNumber = Math.floor(random(6));
            if (randomNumber < 1) {
                if (random(1) < 0.5) {
                    this.sight = this.sight * (random(1) + 1);
                }
                else {
                    this.sight = this.sight * random(1);
                }
            }
            else if (randomNumber < 2) {
                if (random(1) < 0.5) {
                    this.radius = this.radius * (random(1) + 1);
                }
                else {
                    this.radius = this.radius * random(1);
                }
            }
            else if (randomNumber < 4) {
                if (random(1) < 0.5) {
                    this.force = this.force * (random(1) + 1);
                }
                else {
                    this.force = this.force * random(1);
                }
            }
            else if (randomNumber < 5) {
                if (random(1) < 0.5) {
                    this.speed = this.speed * (random(1) + 1);
                }
                else {
                    this.speed = this.speed * random(1);
                }
            }
        };
        
        this.eat = function () {
            // eat food
            var minDistance = Infinity;
            var minIndex = -1;
            for (var i = 0; i < food.length; i++) {
                var distance = int(dist(this.position.x, this.position.y, food[i].x, food[i].y));
                if (distance < minDistance) {
                    minDistance = distance;
                    minIndex = i;
                }
            }
            if (minDistance < this.radius) {
                food.splice(minIndex, 1);
                numberOfFoodIngested++;
                this.health += 50;
            }
            
            // poison
            minDistance = Infinity;
            minIndex = -1;
            for (var i = 0; i < poison.length; i++) {
                var distance = int(dist(this.position.x, this.position.y, poison[i].x, poison[i].y));
                if (distance < minDistance) {
                    minDistance = distance;
                    minIndex = i;
                }
            }
            if (minDistance < this.radius) {
                poison.splice(minIndex, 1);
                numberOfPoisonIngested++;
                this.health -= 50;
            }
        };
        
        this.seek = function () {
            var minDistance = Infinity;
            var minIndex = -1;
            var goal;
            var target;

            // if food detected, follow it
            for (var i = 0; i < food.length; i++) {
                var distance = int(dist(this.position.x, this.position.y, food[i].x, food[i].y));
                if (distance < minDistance) {
                    minDistance = distance;
                    minIndex = i;
                }
            }
            if (minDistance < this.sight) {
                goal = food[minIndex];
                
                target = p5.Vector.sub(goal, this.position);
                
                // normalize then multiply by maximum speed
                target.setMag(this.speed);
                
                // make it closer to the target
                this.desiredPosition = p5.Vector.sub(target, this.velocity);
                this.desiredPosition.limit(this.force);

                // move towards target, as fast as you can
                this.acceleration.add(this.desiredPosition);
            }
            
            // randomize moving
            else if (frameCount % floor(random(30)) == 0) {
                var randomMovement = 7;
                var randX = this.velocity.x + random(randomMovement) - randomMovement / 2;
                var randY = this.velocity.y + random(randomMovement) - randomMovement / 2;
                this.acceleration = createVector(randX, randY);
            }
        };
        
        this.move = function () {
            
            // update position
            this.velocity.add(this.acceleration); // add force if there is any
            this.acceleration.mult(0); // reset acceleration
            this.velocity.limit(this.speed);
            this.position.add(this.velocity);
            
            // if boundary reached, jump on the other side
            if (this.position.x < 5) {
                this.position.x = width - 5;
            }
            if (width - this.position.x < 5) {
                this.position.x = 5;
            }
            if (this.position.y < 5) {
                this.position.y = height - 5;
            }
            if (height - this.position.y < 5) {
                this.position.y = 5;
            }
        };
        
        this.render = function () {
            var theta = this.velocity.heading() + PI / 2;

            //push() function saves the current drawing style settings and transformations
            //pop() restores these settings.
            push();

            // act like it is in the left upper corner
            translate(this.position.x, this.position.y);
            rotate(theta);

            // draw fin
            fill("#358ee8");
            stroke(255, 255, 255);
            arc(0, 0, this.sight, this.sight, PI / 4, 3 * PI / 4, PIE);
            endShape(CLOSE);

            // draw body
            fill("#51a0ef");
            stroke('150');
            beginShape('189');
            ellipse(0, 0, this.radius);

            // draw eye
            fill('255','255','255');
            stroke(255,255,255);
            ellipse(0, -this.radius/3, 1);

            pop();
        };
        
        this.update = function () {
            this.calculateFitness();
            this.eat();
            this.seek();
            this.move();
            this.render();
            this.health -= 1;
            if (this.health > 100) {
                this.health = 100;
            }
        };
    }
}

