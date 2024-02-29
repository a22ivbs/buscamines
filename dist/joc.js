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
            var fila = document.createElement('div');
            fila.className = 'fila';
            var _loop_2 = function (j) {
                var casella = document.createElement('div');
                casella.className = 'casella';
                casella.dataset.fila = i.toString();
                casella.dataset.columna = j.toString();
                casella.addEventListener('click', function () { return _this.revelarCasella(i, j); });
                casella.addEventListener('contextmenu', function (event) {
                    event.preventDefault();
                    _this.marcarCasella(i, j);
                });
                fila.appendChild(casella);
            };
            for (var j = 0; j < this_1.tauler.columnes; j++) {
                _loop_2(j);
            }
            tauler.appendChild(fila);
        };
        var this_1 = this;
        for (var i = 0; i < this.tauler.filas; i++) {
            _loop_1(i);
        }
    };
    Joc.prototype.revelarCasella = function (fila, columna) {
        var casella = this.tauler.caselles[fila][columna];
        if (casella.marcada)
            return;
        casella.revelada = true;
        if (casella.esMina) {
            var element = document.querySelector(".casella[data-fila=\"".concat(fila, "\"][data-columna=\"").concat(columna, "\"]"));
            element.classList.add('mina');
            alert('Has perdut!');
            this.dibuixarTauler();
        }
        else {
            var element = document.querySelector(".casella[data-fila=\"".concat(fila, "\"][data-columna=\"").concat(columna, "\"]"));
            element.classList.add('revelada');
        }
    };
    Joc.prototype.marcarCasella = function (fila, columna) {
        var casella = this.tauler.caselles[fila][columna];
        if (casella.revelada)
            return;
        var element = document.querySelector(".casella[data-fila=\"".concat(fila, "\"][data-columna=\"").concat(columna, "\"]"));
        element.classList.toggle('marcada');
        casella.marcada = !casella.marcada;
    };
    return Joc;
}());
