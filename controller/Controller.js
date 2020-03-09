function refreshParameters() {
    if (simulationState == 0) {
        refreshValues();
        document.getElementById("maxGenerationsToReach").disabled = false;
        document.getElementById("maxFitnessToReach").disabled = false;
        document.getElementById("populationSize").disabled = false;
        document.getElementById("randomFoodGeneration").disabled = false;
        document.getElementById("randomPoisonGeneration").disabled = false;
        document.getElementById("elitism").disabled = false;
        document.getElementById("mutationRate").disabled = false;
        document.getElementById("deathCheckbox").disabled = false;
        document.getElementById("startButton").disabled = false;
        document.getElementById("pauseButton").disabled = true;
        document.getElementById("stopButton").disabled = true;
    } else if (simulationState == 1) {
        refreshValues();
        document.getElementById("maxGenerationsToReach").disabled = true;
        document.getElementById("maxFitnessToReach").disabled = true;
        document.getElementById("populationSize").disabled = true;
        document.getElementById("randomFoodGeneration").disabled = true;
        document.getElementById("randomPoisonGeneration").disabled = true;
        document.getElementById("elitism").disabled = true;
        document.getElementById("mutationRate").disabled = true;
        document.getElementById("deathCheckbox").disabled = true;
        document.getElementById("startButton").disabled = true;
        document.getElementById("pauseButton").disabled = false;
        document.getElementById("stopButton").disabled = false;
    } else if (simulationState == 2) {
        document.getElementById("maxGenerationsToReach").disabled = true;
        document.getElementById("maxFitnessToReach").disabled = true;
        document.getElementById("populationSize").disabled = true;
        document.getElementById("randomFoodGeneration").disabled = true;
        document.getElementById("randomPoisonGeneration").disabled = true;
        document.getElementById("elitism").disabled = true;
        document.getElementById("mutationRate").disabled = true;
        document.getElementById("deathCheckbox").disabled = true;
        document.getElementById("startButton").disabled = true;
        document.getElementById("pauseButton").disabled = false;
        document.getElementById("stopButton").disabled = false;
    }
}

function refreshValues() {
    document.getElementById("fitness").innerHTML = "" + maxFitness.toFixed(5);
    document.getElementById("population").innerHTML = "" + generation;

    fps = parseInt(document.getElementById("framerate").value);
    document.getElementById("framerateOutput").innerHTML = "Framerate (" + fps + " / 60)";
    frameRate(fps);

    maxGenerationsToReach = document.getElementById("maxGenerationsToReach").value;
    document.getElementById("maxGenerationsToReachOutput").innerHTML = maxGenerationsToReach;

    maxFitnessToReach = document.getElementById("maxFitnessToReach").value;
    document.getElementById("maxFitnessToReachOutput").innerHTML = maxFitnessToReach;

    randomFoodGeneration = document.getElementById("randomFoodGeneration").value;
    document.getElementById("randomFoodGenerationOutput").innerHTML = randomFoodGeneration;

    randomPoisonGeneration = document.getElementById("randomPoisonGeneration").value;
    document.getElementById("randomPoisonGenerationOutput").innerHTML = randomPoisonGeneration;

    populationSize = document.getElementById("populationSize").value;
    document.getElementById("populationSizeOutput").innerHTML = populationSize;

    elitism = document.getElementById("elitism").value;
    document.getElementById("elitismOutput").innerHTML = elitism;

    mutationRate = document.getElementById("mutationRate").value * 0.01;
    document.getElementById("mutationRateOutput").innerHTML = mutationRate.toFixed(2);

    deathEnabled = document.getElementById("deathCheckbox").checked;
}

function startSimulation() {
    resetSimulation();
    simulationState = 1;
    resetHistograms();
}

function stopSimulation() {
    resetSimulation();
    simulationState = 0;
    document.getElementById("pauseButton").innerHTML = "PAUSE";
}

function pauseSimulation() {
    if (simulationState == 1) {
        //ABILITA PAUSA
        document.getElementById("pauseButton").innerHTML = "RESUME";
        simulationState = 2;
        frameCountTmp = frameCount;
    } else if (simulationState == 2) {
        //DISABILITA PAUSA
        document.getElementById("pauseButton").innerHTML = "PAUSE";
        simulationState = 1;
        frameCount = frameCountTmp;
    }
}

function checkEndingCondition() {
    if (generation == maxGenerationsToReach || maxFitness >= maxFitnessToReach) {
        simulationState = 0;
    }
}

// html controllers
function resetSimulation() {
    population = new Array();
    food = new Array();
    poison = new Array();
    generation = 0;
    maxFitness = 0;
    frameCount = 0;
    frameCountTmp = 0;
    x = new Array();

    //values
    yFitness = new Array();
    yDeaths = new Array();
    yFood = new Array();
    yPoison = new Array();

    //avgs
    yAverageFitness = new Array();
    yAverageDeaths = new Array();
    yAverageFood = new Array();
    yAveragePoison = new Array();

    //std.deviation
    yStdDeviationFitness = new Array();
    yStdDeviationDeaths = new Array();
    yStdDeviationFood = new Array();
    yStdDeviationPoison = new Array();


    clearBackground();
    initElements();
}