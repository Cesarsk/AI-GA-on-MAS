function runGeneticAlgorithm() {
    var bestInPopulation = new Array();
    var tempElitism = 0;
    var newPopulation = new Array();

    if (population.length < 10) {
        stopSimulation();
        return;
    }

    doElitism(tempElitism, bestInPopulation, newPopulation);
    doCrossover(newPopulation);
    startNewGeneration();
}

function doElitism(tempElitism, bestInPopulation, newPopulation) {
    if (elitism > population.length) { tempElitism = population.length; }
    else { tempElitism = elitism; }

    //maximum problem: find the best (max fitness) organisms and push them into the new generation
    for (var i = 0; i < tempElitism; i++) {
        var maxPopulationFitness = 0;
        var bestOrganism = population[0];
        var bestOrganismIndex = 0;

        for (var j = 0; j < population.length; j++) {
            population[j].calculateFitness();
            if (population[j].fitness > maxPopulationFitness) {
                maxPopulationFitness = population[j].fitness;
                bestOrganism = population[j];
                bestOrganismIndex = j;
            }
        }

        population.splice(bestOrganismIndex, 1);
        bestInPopulation.push(bestOrganism);
    }

    for (var j = 0; j < tempElitism; j++) {
        newPopulation.push(bestInPopulation[j]);
    }
}

function doCrossover(newPopulation) {
    // crossover
    while (newPopulation.length < populationSize) {
        var parent1 = population[Math.floor(random(population.length))];
        var parent2 = population[Math.floor(random(population.length))];
        var child = new Organism();
        if (child != null) {

            // for each feature: 50% to get it from one of the parents.
            if (random(1) < 0.5) { child.radius = parent1.radius; }
            else { child.radius = parent2.radius; }

            if (random(1) < 0.5) { child.sight = parent1.sight; }
            else { child.sight = parent2.sight; }

            if (random(1) < 0.5) { child.force = parent1.force; }
            else { child.force = parent2.force; }

            if (random(1) < 0.5) { child.speed = parent1.speed; }
            else { child.speed = parent2.speed; }

            // mutation
            if (random(1) <= mutationRate) { child.randomMutation(); }

            if (child.radius > child.sight) { child.sight = child.radius + 5; }

            newPopulation.push(child);
        }
    }

    population.splice(0, population.length);
    population = newPopulation.slice();

}

function startNewGeneration() {
    generation++;
    setRandomBackground();
}