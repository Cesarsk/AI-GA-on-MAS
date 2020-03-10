# General TO DO List:
[] Organizzare incontro con la prof.
[] Rispondere al Prof. Roli
[x] Scrivere un bel README
[x] Organizzare presentazione finale in .ppt
[x] Documentation: presentation
[x] Raccogliere Dati
    - Organizzare i Dati

[x] Sostituire titolo, non è un CA
[x] Study GA
[x] Change Style canvas
[x] Aggiungere Instructions
[x] Ringraziamenti

## Bugfix:
[x] Sistemare il frameCount, quando parte la simulazione deve risultate uguale a 0, azzerare il frameCount nella funzione di frame va bene per l'istante iniziale 
[x] Il numero di morti sembra impreciso nell'istogramma.
[x] Perche' gli organismi non crescono piu tanto?
[x] Controllare Food Spawn Rate e Poison Spawn Rate
[] A volte (Valori alti di Elitism) c'è ancora quel bug in console del "radius", ad oggi non chiarito.

## Istogrammi:
[x] Aggiungere parametri usati nella simulazione ai dati come label
[x] Farli generare dinamicamente con il progredire delle generazioni.
[x] Pulsante START (disabilitare possibilità di muovere gli slider)
[x] Pulsante PAUSA
[x] Pulsante RESET (abilitare possibilità di muovere gli slider)
[x] istogramma4: generazione / maxFitness
[x] istogramma1: generazione / numero morti (indicati i parametri scelti durante l'avvio dell'algoritmo)
[x] istogramma2: generazione / numero frutti mangiati
[x] istogramma3: generazione / numero veleni mangiati
[x] istogramma5: fitness media / generazione
[x] istogramma6: population size / generazione


## Criteri di arresto: 
[x] Fissare un numero massimo (controllabile) Kmax di iterazioni (o generazioni);
[x] Fitness massima;

## Altro:

## Canvas:
[x] cambio background animato

## Domande per il Prof.

### Sandbox


Metaeuristica.


    Elitism involves copying a small proportion of the fittest candidates, unchanged, 
    into the next generation. This can sometimes have a dramatic impact on performance 
    by ensuring that the EA does not waste time re-discovering previously discarded partial solutions. 
    Candidate solutions that are preserved unchanged through elitism remain eligible for selection 
    as parents when breeding the remainder of the next generation.

    //A practical variant of the general process of constructing a 
    //new population is to allow the best organism(s) 
    //from the current generation to carry over to the next, unaltered. 
    //This strategy is known as elitist selection and guarantees that 
    //the solution quality obtained by the GA will not decrease from 
    //one generation to the next.