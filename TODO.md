# General TO DO List:
[] Refactor Code
[] Documentation: paper + presentation
[] Study GA
[] Pre-made experiments
[x] Change Style canvas
[x] Aggiungere Instructions

## Bugfix:
[x] Sistemare il frameCount, quando parte la simulazione deve risultate uguale a 0, azzerare il frameCount nella funzione di frame va bene per l'istante iniziale 
[] Il numero di morti sembra impreciso nell'istogramma.
[] Perche' gli organismi non crescono piu tanto?
[] Controllare Food Spawn Rate e Poison Spawn Rate

## Istogrammi:
[x] Aggiungere parametri usati nella simulazione ai dati come label
[x] Farli generare dinamicamente con il progredire delle generazioni.
[x] Pulsante START (disabilitare possibilità di muovere gli slider)
[x] Pulsante PAUSA
[x] Pulsante RESET (abilitare possibilità di muovere gli slider)
[x] istogramma4: generazione / maxFitness
[] istogramma1: generazione / numero morti (indicati i parametri scelti durante l'avvio dell'algoritmo)
[] istogramma2: generazione / numero frutti mangiati
[] istogramma3: generazione / numero veleni mangiati
[] istogramma5: fitness media / generazione
[] istogramma6: population size / generazione

## Vari:
[]

## Criteri di arresto: 
[x] Fissare un numero massimo (controllabile) Kmax di iterazioni (o generazioni);
[x] Fitness massima;

## Altro:
quando fai le prove devi cambiare solo un parametro per volta

## Canvas:
[x] cambio background animato

## Domande per il Prof.
Stavo valutando un po' i dati post esperimento.

Uno dei grafici che volevo tracciare è il rapporto veleni_ingeriti / generazione in forma di istogramma... il comportamento atteso è che il numero di veleni decrementi con l'aumentare delle generazione tuttavia questo comporta che di generazione in generaizone il numero di veleni generati sullo scenario sia costante, è giusto?

Perché se ne genero un numero casuale chiaramente l'istogramma non è valido... D'altro lato immagino un sistema "reale" dove non è precidibile quanti veleni ci possano essere ad ogni generazione. Ha qualche indicazione a riguardo??

Lo stesso vale per il grafico (sempre istogramma) che volevo mettere riguardante il numero di cibi inseriti / generazione.

Altri grafici che ho valutato riguardano la max fitness / generazione, deaths / generazione.

Cosa ne pensa? 

### Sandbox


Metaeuristica.


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