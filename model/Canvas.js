var population = new Array();
var food = new Array();
var poison = new Array();


var maxFitnessToReach = 0;
var maxGenerationsToReach = 0;

var maxFitness = 0;
var generation = 0;

var populationSize = 30;
var randomFoodGeneration = 0;
var randomPoisonGeneration = 0;
var elitism = 5;
var mutationRate = 0;

var numberOfFood = 0;
var numberOfPoison = 0;

var deathEnabled = false;
var fps = 0;
var mutationRateProb = 0;

var frameWidth = 900;
var frameHeight = 500;

var numberOfDeaths = 0;
var numberOfPoisonsEaten = 0;
var numberOfFoodsEaten = 0;

var backgroundColor = '#075484';
var textPauseColor = '';
var frameCountTmp = 0;
var simulationState = 0; //0: Stopped, 1: Running, 2: Paused

p5.disableFriendlyErrors = true; // disables FES

//Setup Canvas, Framerate and Init Elements
function setup() {
    backgroundColor = generateRandomColorHue();
    var cnv = createCanvas(frameWidth, frameHeight);
    cnv.parent('Canvas');
    initElements();
    background(backgroundColor);
    drawSplashScreen();
    refreshParameters();
    fps = parseInt(document.getElementById("framerate").value);
    frameRate(fps);
}

function generateHistograms() {
    updateHistograms();
}

function drawSplashScreen() {
    textPauseColor = color(251, 222, 0);
    textPauseColor.setAlpha(1);
}

function drawPause() {
    fill(textPauseColor);
    textSize(32);
    text("SIMULATION PAUSED", frameWidth / 3.3, frameHeight / 2 - 20);
    text("PRESS PAUSE TO PLAY", frameWidth / 3.3 - 20, frameHeight / 2 + 40);
}

function clearBackground() {
    clear();
    background(backgroundColor);
}

function drawStop() {
    textPauseColor.setAlpha(5);
    fill(textPauseColor);
    textSize(32);
    text("SIMULATION FINISHED", frameWidth / 3.3, frameHeight / 2 - 20);
    text("CHECK STATS OR START OVER", frameWidth / 3.3 - 55, frameHeight / 2 + 40);
}

//Called fps times per second.
function draw() {
    checkEndingCondition();
    refreshParameters();

    if (simulationState == 0) {
        drawStop();
    }
    if (simulationState == 1) {
        runSimulation();
    }
    if (simulationState == 2) {
        drawPause();
    }
}

function runSimulation() {
    simulationState = 1;

    if (frameCount % 150 == 0) {
        runGeneticAlgorithm();
        generateHistograms();
        numberOfDeaths = 0;
        numberOfPoisonsEaten = 0;
        numberOfFoodsEaten = 0;
    }

    // remove all elements from last frame
    clear();

    // background needs to be refreshed as well
    background(backgroundColor);

    removeDead();
    generateFood();
    generatePoison();
    drawFood();
    drawPoison();
}

//Init Elements sets our elements of the simulation
function initElements() {
    for (var i = 0; i < populationSize; i++) {
        population.push(new Organism());
    }
}

function removeDead() {
    for (var i = population.length - 1; i > 0; i--) {
        population[i].update();

        // death   
        if (deathEnabled == true) {
            if (population[i].health <= 0) {
                numberOfDeaths++;
                population.splice(i, 1);
            }
        }
    }
}

function runGeneticAlgorithm() {
    var bestInPopulation = new Array();

    if (population.length < 10) {
        simulationState = 0;
        return;
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
        //take the max
        tempElitism = population.length;
    } else {
        tempElitism = elitism;
    }

    //maximum problem: find the best (max fitness) organisms and push them into the new generation
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
        if (child != null) {
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
            if (random(1) <= mutationRate) {
                child.randomMutation();
            }

            if (child.radius > child.sight) {
                child.sight = child.radius + 5;
            }

            newPopulation.push(child);
        }
    }

    population.splice(0, population.length);
    population = newPopulation.slice();
    generation++;
    backgroundColor = generateRandomColorHue();
    background(backgroundColor);
}

function generateRandomColorHue() {
    randomH = random(360).toFixed(0);
    return randomColorHue = ('hsl('+randomH+',100%,28%)');
}