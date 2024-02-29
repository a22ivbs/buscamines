// a. Classe Casella

// Aquesta classe representarà cada una de les caselles individuals del tauler de buscamines. Cada Casella ha de tenir els següents atributs i mètodes:

// Atributs:
// esMina: Un booleà que indica si la casella conté una mina.
// revelada: Un booleà que indica si la casella ha estat revelada per l'usuari.
// marcada: Un booleà que indica si la casella ha estat marcada com a sospitosa de contenir una mina per l'usuari.
// Mètodes:
// Constructor: Ha de rebre com a paràmetre si la celda és una mina (esMina) i inicialitzar els altres atributs adequadament.


class Casella {
    esMina: boolean;
    revelada: boolean;
    marcada: boolean;

    constructor(esMina: boolean) {
        this.esMina = esMina;
        this.revelada = false;
        this.marcada = false;
    }
}