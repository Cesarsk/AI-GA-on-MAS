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
        perFps = frameCount
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

    if (frameCount % (450 - 5*fps) == 0) {
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

function generateRandomColorHue() {
    randomH = random(360).toFixed(0);
    return randomColorHue = ('hsl('+randomH+',100%,28%)');
}