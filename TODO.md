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

Gentile Prof. Roli,

Innanzitutto la ringrazio nuovamente per l'estrema pazienza e soprattutto per tutto il supporto ricevuto, con assoluta certezza posso dire che non sarei riuscito ad arrivare fino a qui senza le sue conferme e suggerimenti.

La invito a consultare la demo nuovamente nella sua versione definitiva:
    - https://cesarsk.github.io/AI-GA-on-MAS/

Ho effettuato i cambi dei nomi come suggerito, ho inserito media e deviazione standard, che hanno portato ai comportamenti aspettati, finalmente.

Il movimento dell'organismo funziona nel seguente modo:

Ogni organismo è dotato di un sensore (la grandezza della pinna indica quanto distante è in grado di rilevare).

L'ambiente "nei paraggi" viene analizzato e, non appena viene rilevato del cibo, l'organismo memorizza la sua distanza da esso. Se rileva altre particelle di cibo, si sceglie di memorizzare il cibo meno distante da esso. (un semplice problema di ricerca del minimo).

Dopo questa operazione, abbiamo un goal, e l'organismo si muove verso di esso. Non appena la distanza è nulla, il cibo viene ingerito.

Nel caso nessun cibo fosse a portata dell'organismo, il movimento è randomizzato, quindi l'organismo intraprende una direzione casuale.

Spero di aver fatto chiarezza,

Cordialmente,
Luca Cesarano