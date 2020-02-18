# Summary:

## Objective:

Visualization simulates the simplified artificial Life. We simulate a corpulent genetic algorithm.

Rules:

It is for individuals to survive in the system for as long as possible.
The eater feeds on food, but there's also poison that reduces it.

If you see the food is close enough, the individual can detect with the sensor, if the sensor is sufficient good range.

## Model of the individual:

The initial population has 50 chromosomes, whereas dnk consists of the attributes:

-7 hello
-f8 body diameter, sensors
-force and speed
-maximum force and speed

Demo:
github.io put a live version

Fitness function
All attributes have been used to calculate fitness functions l2 dnk, their sum is taken.

Selection:

At first the "roulette wheel" the selection algo, which gave quite solid results. After experimenting, implementing ordinary random selection of rhodium, the results are very bad, the time we are get the same fitness hit "roulette wheel selection algo" was up to 10 times shorter. Since simulation despicts artificial life, implementation death of individuals. When dying individuals because of bad healrth was actually made by selection, whereby in the population there remain individuals that are considerable more resilient, much easier to survive in the system.
By randomly selecting a parent and introducing a death of poor health, we got significantly better results, which even gave 10% better results than roulette wheel selections.

Crossover:

For each attribute within dns, during the crossover is they are randomly selected by their parents and there is a 500% off chance for each attribute that the attribute value be retrieved from the first or ... missing part

Mutation

the optimal parameter of the mutation is 0.3 but also significantly higher values do not affect the stability of the system, ak accelerate the process of evolution toward the hundredth value fitness functions.

The disadvantages of introducing death:

the bad side used versions of the algo with implicit death is single premature dying. if there is not enough in the field food, many will die and reproduction will become monotonou s because of the small number of individuals. problems can solve by increasing the mutation coefficient, but in most cases, the problem of grandiose dying significantly increases the retrieval time good quality individuals for housing.
