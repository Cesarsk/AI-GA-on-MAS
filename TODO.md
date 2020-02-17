- Refactor Code
- Documentation
- Experiments
- Stats
- Change Style canvas
- Study GA

- Istogrammi generati sulla pagina web:
    - istogramma1: generazione / numero morti (indicati i parametri scelti durante l'avvio dell'algoritmo)
    - istogramma2: generazione / numero frutti mangiati
    - istogramma3: generazione / numero veleni mangiati
    - istogramma4: generazione / numero acqua bevuta
    - istogramma5: generazione / maxFitness

Criteri di arresto: 
- Fissare un numero massimo Kmax di iterazioni (o generazioni);
- Fissare un tempo di esecuzione limite Tmax;

Nota su istogrammi:

- farli generare dinamicamente con il progredire delle generazioni.
- Pulsante START (disabilitare possibilità di muovere gli slider)
- Pulsante PAUSA
- Pulsante RESET (abilitare possibilità di muovere gli slider)

Bugfix: sistemare il frameCount , quando parte la simulazione deve risultate uguale a 0, azzerare il frameCOunt nella funzione di frame va bene per l'istante iniziale 

- Funzione di Export per istogrammi

Aggiungere allo slider una funzionalità per controllare la condizione di arresto (numero generazioni max)