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
            let filaDiv = document.createElement('div'); // Crear un elemento div para la fila
            filaDiv.className = 'fila';
            for (let j = 0; j < this.tauler.columnes; j++) {
                let casella = document.createElement('img'); // Crear un elemento img
                casella.className = 'casella';
                casella.dataset.fila = i.toString();
                casella.dataset.columna = j.toString();
                casella.src = './img/square.gif'; // Establecer el src a square.gif
                casella.addEventListener('click', () => this.revelarCasella(i, j));
                casella.addEventListener('contextmenu', (event) => {
                    event.preventDefault();
                    this.marcarCasella(i, j);
                });
                filaDiv.appendChild(casella); // Añadir la imagen a la fila
            }
            tauler.appendChild(filaDiv); // Añadir la fila al tauler
        }
    }


    revelarTodo() {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                let casella = this.tauler.caselles[i][j];
                let element = document.querySelector(`.casella[data-fila="${i}"][data-columna="${j}"]`) as HTMLImageElement;
                if (casella.esMina) {
                    element.src = './img/mina.png';
                } else {
                    let minesAlVoltant = this.getMinesAlVoltant(i, j);
                    element.src = `./img/Minesweeper_${minesAlVoltant}.gif`;
                }
                element.classList.add('revelada');
            }
        }
    }


    revelarCasella(fila: number, columna: number) {

        //comprovar si se a ganado
        if (this.comprobarVictoria()) {
            alert('Has guanyat!');
            location.reload();
        }
        
        let casella = this.tauler.caselles[fila][columna];
        if (casella.marcada) return;
        casella.revelada = true;
        let element = document.querySelector(`.casella[data-fila="${fila}"][data-columna="${columna}"]`) as HTMLImageElement;
        if (casella.esMina) {
            
            element.classList.add('mina');
            element.src = './img/mina.png'; // Cambiar el src a mina.gif
            this.revelarTodo();
            

            setTimeout(() => {
                alert('Has perdut!');
                console.log('Has perdut!');
                location.reload();
            }, 3000);
        } else {
            // Comprovar quantes mines hi ha al voltant i actualitzar el src segun la cantidad de mines al voltant de la casella clicada tengo imagenes de 0 a 8 que representan la cantidad de minas alrededor de la casella clicada Minesweeper_0.gif, Minesweeper_1.gif, ..., Minesweeper_8.gif
            let minesAlVoltant = this.getMinesAlVoltant(fila, columna);
            element.src = `./img/Minesweeper_${minesAlVoltant}.gif`;
            if (minesAlVoltant === 0) {
                this.obrirVeines(fila, columna);
            }

            element.classList.add('revelada');
            
        }
    }

    comprobarVictoria() {
        for (let i = 0; i < this.tauler.filas; i++) {
            for (let j = 0; j < this.tauler.columnes; j++) {
                let casella = this.tauler.caselles[i][j];
                if (casella.esMina) {
                    if (!casella.marcada) {
                        return false; // Si hay una mina sin marcar, no se ha ganado
                    }
                } else {
                    if (casella.marcada) {
                        return false; // Si hay una casilla marcada sin mina, no se ha ganado
                    }
                }
            }
        }
        return true; // Todas las minas están marcadas correctamente, se ha ganado
    }

    getMinesAlVoltant(fila: number, columna: number) {
        let minesAlVoltant = 0;
        for (let i = fila - 1; i <= fila + 1; i++) {
            for (let j = columna - 1; j <= columna + 1; j++) {
                if (i >= 0 && i < this.tauler.filas && j >= 0 && j < this.tauler.columnes) {
                    if (this.tauler.caselles[i][j].esMina) {
                        minesAlVoltant++;
                    }
                }
            }
        }
        return minesAlVoltant;
    }

    obrirVeines(fila: number, columna: number) {
        for (let i = fila - 1; i <= fila + 1; i++) {
            for (let j = columna - 1; j <= columna + 1; j++) {
                if (i >= 0 && i < this.tauler.filas && j >= 0 && j < this.tauler.columnes) {
                    let casella = this.tauler.caselles[i][j];
                    if (!casella.revelada && !casella.marcada) {
                        casella.revelada = true;
                        let element = document.querySelector(`.casella[data-fila="${i}"][data-columna="${j}"]`) as HTMLImageElement;
                        let minesAlVoltant = this.getMinesAlVoltant(i, j);
                        element.src = `./img/Minesweeper_${minesAlVoltant}.gif`;
                        element.classList.add('revelada');
                        if (minesAlVoltant === 0) {
                            this.obrirVeines(i, j);
                        }
                    }
                }
            }
        }
    }

    marcarCasella(fila: number, columna: number) {
        let casella = this.tauler.caselles[fila][columna];
        if (casella.revelada) return;
        let element = document.querySelector(`.casella[data-fila="${fila}"][data-columna="${columna}"]`) as HTMLImageElement;
        element.classList.toggle('marcada');
        if (casella.marcada) {
            element.setAttribute('src', '');
        } else {
            element.setAttribute('src', './img/flag.png');
        }
        casella.marcada = !casella.marcada;
    }
}