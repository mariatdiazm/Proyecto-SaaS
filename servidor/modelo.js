function Usuario(nick) {
    this.nick = nick;
}

function Sistema() {
    this.usuarios = {};
    this.juego = new JuegoSimon();

    this.agregarUsuario = function(nick) {
        let res = { nick: -1 };
        if (!this.usuarios[nick]) {
            this.usuarios[nick] = new Usuario(nick);
            res.nick = nick;
        }
        return res;
    };

    this.obtenerUsuarios = function() {
        return this.usuarios;
    };

    this.usuarioActivo = function(nick) {
        return !!this.usuarios[nick];
    };

    this.eliminarUsuario = function(nick) {
        delete this.usuarios[nick];
    };

    this.numeroUsuarios = function() {
        return Object.keys(this.usuarios).length;
    };
}

function JuegoSimon() {
    this.secuencia = [];

    this.generarSiguiente = function() {
        const colores = ['rojo', 'azul', 'verde', 'amarillo'];
        const nuevo = colores[Math.floor(Math.random() * colores.length)];
        this.secuencia.push(nuevo);
        return [...this.secuencia];
    };

    this.obtenerSecuencia = function() {
        return [...this.secuencia];
    };

    this.comprobarSecuencia = function(intento) {
        for (let i = 0; i < intento.length; i++) {
            if (this.secuencia[i] !== intento[i]) {
                return { exito: false, correctoHasta: i };
            }
        }
        return { exito: intento.length === this.secuencia.length };
    };

    this.reiniciar = function() {
        this.secuencia = [];
    };
}

module.exports.Sistema=Sistema 