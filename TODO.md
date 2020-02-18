# GENERAL TO DO LIST

- Refactor Code
- Documentation
- Experiments
- Stats
- Change Style canvas
- Study GA

[] Aggiungere Instructions

## Criteri di arresto: 
[x] Fissare un numero massimo (controllabile) Kmax di iterazioni (o generazioni);
- Fissare un tempo di esecuzione limite Tmax;

## Istogrammi:
[] Aggiungere parametri usati nella simulazione ai dati come label
[x] Farli generare dinamicamente con il progredire delle generazioni.
[x] Pulsante START (disabilitare possibilità di muovere gli slider)
[x] Pulsante PAUSA
[x] Pulsante RESET (abilitare possibilità di muovere gli slider)
- istogramma1: generazione / numero morti (indicati i parametri scelti durante l'avvio dell'algoritmo)
- istogramma2: generazione / numero frutti mangiati
- istogramma3: generazione / numero veleni mangiati
- istogramma4: generazione / numero acqua bevuta
[x] istogramma5: generazione / maxFitness
[-] Funzione di Export per istogrammi: e' già possibile salvarli come png. Export in .zip?
[] Disattivare Istogram Morti se Death è disabilitata.

## Bugfix:
[x] Bugfix: sistemare il frameCount , quando parte la simulazione deve risultate uguale a 0, azzerare il frameCOunt nella funzione di frame va bene per l'istante iniziale 
[] Il numero di morti sembra impreciso nell'istogramma (controllare con fps * 5).

[] RANDOM FOOD SPAWN RATE?
[] RANDOM POISON SPAWN RATE?