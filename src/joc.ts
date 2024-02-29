// c. Classe Joc

// Finalment, la tercera part de la pràctica consisteix en desenvolupar la classe Joc, que serà l'encarregada de gestionar la lògica del joc, incloent la interacció de l'usuari i el seguiment de l'estat del joc. La classe Joc ha de tenir els següents atributs i mètodes:

// Atributs:
// tauler : Una instància de la classe Tauler que representa el tauler de joc.
// Mètodes:
// Constructor: Ha de crear el tablero i preparar tot el necessari per començar a jugar.
// dibuixarTauler(): Un mètode per dibuixar o actualitzar la representació visual del tauler en l'interfície d'usuari. Això voldrà dir, que hem de crear una representació en HTML que sigui coherent amb la representació del tauler.
// revelarCasella(fila, columna): Un mètode per gestionar l'acció de l'usuari de revelar una celda, incloent la comprovació de mines i l'actualització de l'estat del joc.
// marcarCasella(fila, columna): Un mètode per permetre a l'usuari marcar o desmarcar una celda com a sospitosa de contenir una mina.



class Joc {
    tauler: Tauler;

    constructor(filas: number, columnes: number) {
        this.tauler = new Tauler(filas, columnes);
        this.dibuixarTauler();
    }

    dibuixarTauler() {
        let tauler = document.getElementById('tauler');
        tauler.innerHTML = '';
        for (let i = 0; i < this.tauler.filas; i++) {
            let fila = document.createElement('div');
            fila.className = 'fila';
            for (let j = 0; j < this.tauler.columnes; j++) {
                let casella = document.createElement('div');
                casella.className = 'casella';
                casella.dataset.fila = i.toString();
                casella.dataset.columna = j.toString();
                casella.addEventListener('click', () => this.revelarCasella(i, j));
                casella.addEventListener('contextmenu', (event) => {
                    event.preventDefault();
                    this.marcarCasella(i, j);
                });
                fila.appendChild(casella);
            }
            tauler.appendChild(fila);
        }
    }

    revelarCasella(fila: number, columna: number) {
        let casella = this.tauler.caselles[fila][columna];
        if (casella.marcada) return;
        casella.revelada = true;
        if (casella.esMina) {
            let element = document.querySelector(`.casella[data-fila="${fila}"][data-columna="${columna}"]`);
            element.classList.add('mina');
            alert('Has perdut!');
            this.dibuixarTauler();

        } else {
            let element = document.querySelector(`.casella[data-fila="${fila}"][data-columna="${columna}"]`);
            element.classList.add('revelada');
        }

    }

    marcarCasella(fila: number, columna: number) {
        let casella = this.tauler.caselles[fila][columna];
        if (casella.revelada) return;
        let element = document.querySelector(`.casella[data-fila="${fila}"][data-columna="${columna}"]`);
        element.classList.toggle('marcada');
        casella.marcada = !casella.marcada;

    }
}