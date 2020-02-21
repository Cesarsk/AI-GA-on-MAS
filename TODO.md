# General TO DO List:
[] Refactor Code
[] Documentation
[] Change Style canvas
[] Study GA
[] Pre-made experiments
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
[x] istogramma1: generazione / numero morti (indicati i parametri scelti durante l'avvio dell'algoritmo)
[x] istogramma2: generazione / numero frutti mangiati
[x] istogramma3: generazione / numero veleni mangiati
[x] istogramma4: generazione / maxFitness
[x] istogramma5: fitness media / generazione

## Vari:
[?] Funzione di Export per istogrammi: e' già possibile salvarli come png. Export in .zip?
[?] Disattivare Istogram Morti se Death è disabilitata.

## Criteri di arresto: 
[x] Fissare un numero massimo (controllabile) Kmax di iterazioni (o generazioni);
[x] Fitness massima;
[?] Fissare un tempo di esecuzione limite Tmax;

## Altro:
Ed ha detto che quando fai le prove devi cambiare solo un parametro per volta
Si qualche grafico me l'ha chiesto
Comunque ti segnalo che da PC si sminchia un po' l'interfaccia

## Canvas:

[] Bordino bianco
[x] cambio background animato

## Domande per il Prof.
Stavo valutando un po' i dati post esperimento.

Uno dei grafici che volevo tracciare è il rapporto veleni_ingeriti / generazione in forma di istogramma... il comportamento atteso è che il numero di veleni decrementi con l'aumentare delle generazione tuttavia questo comporta che di generazione in generaizone il numero di veleni generati sullo scenario sia costante, è giusto?

Perché se ne genero un numero casuale chiaramente l'istogramma non è valido... D'altro lato immagino un sistema "reale" dove non è precidibile quanti veleni ci possano essere ad ogni generazione. Ha qualche indicazione a riguardo??

Lo stesso vale per il grafico (sempre istogramma) che volevo mettere riguardante il numero di cibi inseriti / generazione.

Altri grafici che ho valutato riguardano la max fitness / generazione, deaths / generazione.

Cosa ne pensa? 




Domanda relativa alla generazione del cibo. Per il tracciamento di un'istogramma devo fare in modo che ad ogni generazione la quantità 

Metaeuristica.