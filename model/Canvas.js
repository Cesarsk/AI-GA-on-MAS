var population = new Array();
var food = new Array();
var water = new Array();
var poison = new Array();

var elitism = 5;
var generation = 0;
var populationSize = 30;
var mutationRate = 0.9;
var numberOfFood = 200;
var numberOfWater = 50;
var numberOfPoison = 30;
var maxFitness = 0;

var randomFoodGeneration = 15;
var randomWaterGeneration = 3;
var randomPoisonGeneration = 3;

var deathEnabled = false;
var pauseEnabled = true;
var fps = 0;
var mutationRateProb = 0;

var frameWidth = 900;
var frameHeight = 500;

var backgroundColor = '#075484';
var textPauseColor;
var frameCountTmp = 0;

p5.disableFriendlyErrors = true; // disables FES

// html controllers
function resetSimulation() {
    population = new Array();
    food = new Array();
    water = new Array();
    poison = new Array();
    generation = 0;
    maxFitness = 0;
    frameCount = 0;
    frameCountTmp = 0;

    initElements();
}

//Setup Canvas, Framerate and Init Elements
function setup() {
    var cnv = createCanvas(frameWidth, frameHeight);
    cnv.parent('Canvas');
    initElements();
    background(backgroundColor);
    textPauseColor = color(251, 202, 38);
    textPauseColor.setAlpha(1);
    refreshParameters();
}

//Init Elements sets our elements of the simulation
function initElements() {
    fps = parseInt(document.getElementById("framerate").value);
    frameRate(fps);

    for (var i = 0; i < populationSize; i++) {
        population.push(new Organism());
    }

    for (var i = 0; i < numberOfFood; i++) {
        food.push(createVector(random(frameWidth - 20) + 10, random(frameHeight - 20) + 10));
    }

    for (var i = 0; i < numberOfWater; i++) {
        water.push(createVector(random(frameWidth - 20) + 10, random(frameHeight - 20) + 10));
    }

    for (var i = 0; i < numberOfPoison; i++) {
        poison.push(createVector(random(frameWidth - 20) + 10, random(frameHeight - 20) + 10));
    }
}

//Called (num_frames) per second.
function draw() {
    refreshPause();
    if (pauseEnabled == false) {
        // every 5 seconds generating new population
        if (frameCount % (fps*5) == 0) {
            runGeneticAlgorithm();
        }

        // remove all elements from last frame
        clear();

        // background needs to be refreshed as well
        background(backgroundColor);

        // funcs to call
        removeDead();
        generateElements();
        drawElements();
    }
    refreshParameters();
}

function drawElements() {
    // draw food
    for (var i = 0; i < food.length; i++) {
        fill(0, 255, 0);
        noStroke();
        ellipse(food[i].x, food[i].y, 5, 5);
    }

    // water
    for (var i = 0; i < water.length; i++) {
        fill(0, 191, 255);
        noStroke();
        ellipse(water[i].x, water[i].y, 5);
    }

    // poison
    for (var i = 0; i < poison.length; i++) {
        fill(255, 0, 0);
        noStroke();
        rect(poison[i].x, poison[i].y, 5, 5);
    }
}

function generateElements() {
    // random food generation
    if (random(1) < 0.3) {
        for (var i = 0; i < randomFoodGeneration; i++) {
            food.push(createVector(random(frameWidth - 20) + 10, random(frameHeight - 20) + 10));
        }
    }

    // random water generation
    if (random(1) < 0.3) {
        for (var i = 0; i < randomFoodGeneration; i++) {
            if (random(1) < 0.1) {
                water.push(createVector(random(frameWidth - 20) + 10, random(frameHeight - 20) + 10));
            }
        }
    }

    // random poison generation
    if (random(1) < 0.3) {
        for (var i = 0; i < randomPoisonGeneration; i++) {
            if (random(1) < 0.1) {
                poison.push(createVector(random(frameWidth - 20) + 10, random(frameHeight - 20) + 10));
            }
        }
    }
}

function removeDead() {
    for (var i = population.length - 1; i > 0; i--) {
        population[i].update();

        // death   
        if (deathEnabled == true) {
            if (population[i].health <= 0) {
                population.splice(i, 1);
            }
        }
    }
}

function refreshParameters() {
    document.getElementById("fitness").innerHTML = "" + maxFitness.toFixed(5);
    document.getElementById("population").innerHTML = "" + generation;

    fps = parseInt(document.getElementById("framerate").value);
    document.getElementById("framerateOutput").innerHTML = "Framerate ("+fps+" / 60)";
    frameRate(fps);

    randomFoodGeneration = document.getElementById("randomFoodGeneration").value;
    document.getElementById("randomFoodGenerationOutput").innerHTML = randomFoodGeneration;

    populationSize = document.getElementById("populationSize").value;
    document.getElementById("populationSizeOutput").innerHTML = populationSize;

    elitism = document.getElementById("elitism").value;
    document.getElementById("elitismOutput").innerHTML = elitism;

    mutationRate = document.getElementById("mutationRate").value * 0.01;
    document.getElementById("mutationRateOutput").innerHTML = mutationRate.toFixed(2);

    deathEnabled = document.getElementById("deathCheckbox").checked;
}

function pauseSimulation() {
    if (pauseEnabled) {
        //DISABILITA PAUSA
        pauseEnabled = false;
        frameCount = frameCountTmp;
    } else {
        //ABILITA PAUSA
        pauseEnabled = true;
        frameCountTmp = frameCount;
    }
}

function refreshPause() {
    if (pauseEnabled) {
        fill(textPauseColor);
        textSize(32);
        text("SIMULATION PAUSED", frameWidth / 3.3, frameHeight / 2 - 20);
        text("PRESS PAUSE TO PLAY", frameWidth / 3.3 - 20, frameHeight / 2 + 40);
    }
}

function runGeneticAlgorithm() {
    var bestInPopulation = new Array();

    if (population.length < 10) {
        //return;
    }

    // elitism

    //Elitism involves copying a small proportion of the fittest candidates, unchanged, 
    //into the next generation. This can sometimes have a dramatic impact on performance 
    //by ensuring that the EA does not waste time re-discovering previously discarded partial solutions. 
    //Candidate solutions that are preserved unchanged through elitism remain eligible for selection 
    //as parents when breeding the remainder of the next generation.

    //A practical variant of the general process of constructing a 
    //new population is to allow the best organism(s) 
    //from the current generation to carry over to the next, unaltered. 
    //This strategy is known as elitist selection and guarantees that 
    //the solution quality obtained by the GA will not decrease from 
    //one generation to the next.

    var tempElitism = 0;
    if (elitism > population.length) {
        tempElitism = population.length;
    }

    else {
        tempElitism = elitism;
    }

    for (var i = 0; i < tempElitism; i++) {

        var maxPopulationFitness = 0;

        var bestChromosome = population[0];
        var bestChromosomeIndex = 0;

        for (var j = 0; j < population.length; j++) {
            population[j].calculateFitness();
            if (population[j].fitness > maxPopulationFitness) {
                maxPopulationFitness = population[j].fitness;
                bestChromosome = population[j];
                bestChromosomeIndex = j;
            }
        }

        population.splice(bestChromosomeIndex, 1);
        bestInPopulation.push(bestChromosome);
    }

    var newPopulation = new Array();
    for (var j = 0; j < tempElitism; j++) {
        newPopulation.push(bestInPopulation[j]);
    }

    // crossover
    while (newPopulation.length < populationSize) {

        var parent1 = population[Math.floor(random(population.length))];
        var parent2 = population[Math.floor(random(population.length))];
        var child = new Organism();

        if (random(1) < 0.5) {
            child.radius = parent1.radius;
        }
        else {
            child.radius = parent2.radius;
        }

        if (random(1) < 0.5) {
            child.sight = parent1.sight;
        }
        else {
            child.sight = parent2.sight;
        }

        if (random(1) < 0.5) {
            child.maxForce = parent1.maxForce;
        }
        else {
            child.maxForce = parent2.maxForce;
        }

        if (random(1) < 0.5) {
            child.maxSpeed = parent1.maxSpeed;
        }
        else {
            child.maxSpeed = parent2.maxSpeed;
        }

        // mutation
        mutationRateProb = random(1);
        if (mutationRateProb <= mutationRate) {
            child.randomMutation();
        }

        if (child.radius > child.sight) {
            child.sight = child.radius + 5;
        }

        newPopulation.push(child);
    }

    population.splice(0, population.length);
    population = newPopulation.slice();
    generation++;
}