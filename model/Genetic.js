function runGeneticAlgorithm() {
    var bestInPopulation = new Array();

    if (population.length < 10) {
        simulationState = 0;
        return;
    }

    // elitism
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