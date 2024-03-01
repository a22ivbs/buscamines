"use strict";
// c. Classe Joc
// Finalment, la tercera part de la pràctica consisteix en desenvolupar la classe Joc, que serà l'encarregada de gestionar la lògica del joc, incloent la interacció de l'usuari i el seguiment de l'estat del joc. La classe Joc ha de tenir els següents atributs i mètodes:
// Atributs:
// tauler : Una instància de la classe Tauler que representa el tauler de joc.
// Mètodes:
// Constructor: Ha de crear el tablero i preparar tot el necessari per començar a jugar.
// dibuixarTauler(): Un mètode per dibuixar o actualitzar la representació visual del tauler en l'interfície d'usuari. Això voldrà dir, que hem de crear una representació en HTML que sigui coherent amb la representació del tauler.
// revelarCasella(fila, columna): Un mètode per gestionar l'acció de l'usuari de revelar una celda, incloent la comprovació de mines i l'actualització de l'estat del joc.
// marcarCasella(fila, columna): Un mètode per permetre a l'usuari marcar o desmarcar una celda com a sospitosa de contenir una mina.
var Joc = /** @class */ (function () {
    function Joc(filas, columnes) {
        this.tauler = new Tauler(filas, columnes);
        this.dibuixarTauler();
    }
    Joc.prototype.dibuixarTauler = function () {
        var _this = this;
        var tauler = document.getElementById('tauler');
        tauler.innerHTML = '';
        var _loop_1 = function (i) {
            var filaDiv = document.createElement('div'); // Crear un elemento div para la fila
            filaDiv.className = 'fila';
            var _loop_2 = function (j) {
                var casella = document.createElement('img'); // Crear un elemento img
                casella.className = 'casella';
                casella.dataset.fila = i.toString();
                casella.dataset.columna = j.toString();
                casella.src = './img/square.gif'; // Establecer el src a square.gif
                casella.addEventListener('click', function () { return _this.revelarCasella(i, j); });
                casella.addEventListener('contextmenu', function (event) {
                    event.preventDefault();
                    _this.marcarCasella(i, j);
                });
                filaDiv.appendChild(casella); // Añadir la imagen a la fila
            };
            for (var j = 0; j < this_1.tauler.columnes; j++) {
                _loop_2(j);
            }
            tauler.appendChild(filaDiv); // Añadir la fila al tauler
        };
        var this_1 = this;
        for (var i = 0; i < this.tauler.filas; i++) {
            _loop_1(i);
        }
    };
    Joc.prototype.revelarTodo = function () {
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                var casella = this.tauler.caselles[i][j];
                var element = document.querySelector(".casella[data-fila=\"".concat(i, "\"][data-columna=\"").concat(j, "\"]"));
                if (casella.esMina) {
                    element.src = './img/mina.png';
                }
                else {
                    var minesAlVoltant = this.getMinesAlVoltant(i, j);
                    element.src = "./img/Minesweeper_".concat(minesAlVoltant, ".gif");
                }
                element.classList.add('revelada');
            }
        }
    };
    Joc.prototype.revelarCasella = function (fila, columna) {
        var casella = this.tauler.caselles[fila][columna];
        if (casella.marcada)
            return;
        casella.revelada = true;
        var element = document.querySelector(".casella[data-fila=\"".concat(fila, "\"][data-columna=\"").concat(columna, "\"]"));
        if (casella.esMina) {
            element.classList.add('mina');
            element.src = './img/mina.png'; // Cambiar el src a mina.gif
            this.revelarTodo();
            setTimeout(function () {
                alert('Has perdut!');
                //recargar la pagina
                location.reload();
            }, 100);
        }
        else {
            // Comprovar quantes mines hi ha al voltant i actualitzar el src segun la cantidad de mines al voltant de la casella clicada tengo imagenes de 0 a 8 que representan la cantidad de minas alrededor de la casella clicada Minesweeper_0.gif, Minesweeper_1.gif, ..., Minesweeper_8.gif
            var minesAlVoltant = this.getMinesAlVoltant(fila, columna);
            element.src = "./img/Minesweeper_".concat(minesAlVoltant, ".gif");
            if (minesAlVoltant === 0) {
                this.obrirVeines(fila, columna);
            }
            element.classList.add('revelada');
        }
    };
    Joc.prototype.getMinesAlVoltant = function (fila, columna) {
        var minesAlVoltant = 0;
        for (var i = fila - 1; i <= fila + 1; i++) {
            for (var j = columna - 1; j <= columna + 1; j++) {
                if (i >= 0 && i < this.tauler.filas && j >= 0 && j < this.tauler.columnes) {
                    if (this.tauler.caselles[i][j].esMina) {
                        minesAlVoltant++;
                    }
                }
            }
        }
        return minesAlVoltant;
    };
    Joc.prototype.obrirVeines = function (fila, columna) {
        for (var i = fila - 1; i <= fila + 1; i++) {
            for (var j = columna - 1; j <= columna + 1; j++) {
                if (i >= 0 && i < this.tauler.filas && j >= 0 && j < this.tauler.columnes) {
                    this.tauler.caselles[i][j].revelada = true;
                }
            }
        }
    };
    Joc.prototype.marcarCasella = function (fila, columna) {
        // cambiar el src a bandera.gif si la casella no esta marcada y a square.gif si la casella esta marcada
        var casella = this.tauler.caselles[fila][columna];
        if (casella.revelada)
            return;
        var element = document.querySelector(".casella[data-fila=\"".concat(fila, "\"][data-columna=\"").concat(columna, "\"]"));
        element.classList.toggle('marcada');
        casella.marcada = !casella.marcada;
        element.setAttribute('src', 'flag.png');
    };
    return Joc;
}());
