function ClienteRest() {

    /**
     * Agrega un usuario enviando POST a /api/agregar-jugador con JSON { nombre: nick }
     * @param {string} nick - Nombre del jugador a registrar
     */
    this.agregarUsuario = function (nick, callback) {
        if (!nick) {
            console.log("Error: falta el parámetro 'nick'");
            return;
        }
        $.ajax({
            url: '/api/agregar-jugador',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ nombre: nick }),
            success: function (data) {
                if (data.nick !== -1) {
                    console.log("Usuario " + nick + " ha sido registrado");
                } else {
                    console.log("El nick ya está ocupado");
                }
                if (callback) callback(data);
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Error al agregar usuario:", textStatus, errorThrown);
                if (callback) callback(null);
            }
        });
    };

    /**
     * Obtiene la lista completa de usuarios (puedes implementar la ruta en backend si quieres)
     * Actualmente no tienes API para esto, pero si la agregas, aquí llamas a /api/usuarios (ejemplo)
     * @param {function} callback - Función que recibe la lista de usuarios
     */
    this.obtenerUsuarios = function (callback) {
        $.getJSON('/api/usuarios', function (data) {
            console.log("Usuarios:", data);
            if (callback) callback(data);
        }).fail(function () {
            console.log("Error al obtener usuarios");
        });
    };

    /**
     * Obtiene el número de usuarios conectados
     * @param {function} callback - Función que recibe un objeto con la cantidad { num: n }
     */
    this.numeroUsuarios = function (callback) {
        $.getJSON('/api/num-jugadores', function (data) {
            console.log("Número de usuarios:", data);
            if (callback) callback(data);
        }).fail(function () {
            console.log("Error al obtener número de usuarios");
        });
    };

    /**
     * Consulta si un usuario está activo (requiere backend que implemente esta ruta)
     * @param {string} nick - Nombre del jugador a consultar
     * @param {function} callback - Función que recibe true/false
     */
    this.usuarioActivo = function (nick, callback) {
        if (!nick) {
            console.log("Error: falta el parámetro 'nick'");
            return;
        }
        $.getJSON('/api/usuario-activo/' + nick, function (data) {
            console.log(`Usuario activo (${nick}):`, data);
            if (callback) callback(data);
        }).fail(function () {
            console.log("Error al consultar usuario activo");
        });
    };

    /**
     * Elimina un usuario enviando DELETE a /api/eliminar-usuario/:nick
     * @param {string} nick - Nombre del jugador a eliminar
     * @param {function} callback - Función que recibe resultado del borrado
     */
    this.eliminarUsuario = function (nick, callback) {
        if (!nick) {
            console.log("Error: falta el parámetro 'nick'");
            return;
        }
        $.ajax({
            url: '/api/eliminar-usuario/' + nick,
            method: 'DELETE',
            success: function (data) {
                console.log(`Usuario eliminado (${nick}):`, data);
                if (callback) callback(data);
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Error al eliminar usuario:", textStatus, errorThrown);
            },
            contentType: 'application/json'
        });
    };

    /**
     * Obtiene la secuencia actual del juego (GET /api/secuencia)
     * @param {function} callback - Recibe objeto { secuencia: [...] }
     */
    this.obtenerSecuencia = function (callback) {
        $.getJSON('/api/secuencia', function (data) {
            console.log("Secuencia actual:", data.secuencia);
            if (callback) callback(data.secuencia);
        }).fail(function () {
            console.log("Error al obtener secuencia");
        });
    };

    /**
     * Genera el siguiente paso en la secuencia (POST /api/siguiente)
     * @param {function} callback - Recibe objeto { secuencia: [...] }
     */
    this.generarSiguiente = function (callback) {
        $.ajax({
            url: '/api/siguiente',
            method: 'POST',
            success: function (data) {
                console.log("Nueva secuencia generada:", data.secuencia);
                if (callback) callback(data.secuencia);
            },
            error: function () {
                console.log("Error al generar siguiente paso");
            }
        });
    };

    /**
     * Comprueba la secuencia intentada (POST /api/comprobar) con { intento: [...] }
     * @param {Array} intento - Secuencia tentativa que envía el jugador
     * @param {function} callback - Recibe resultado { exito: bool, correctoHasta: int? }
     */
    this.comprobarSecuencia = function (intento, callback) {
        $.ajax({
            url: '/api/comprobar',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ intento }),
            success: function (data) {
                console.log("Resultado de comprobación:", data);
                if (callback) callback(data);
            },
            error: function () {
                console.log("Error al comprobar secuencia");
            }
        });
    };

    /**
     * Reinicia el juego (POST /api/reiniciar)
     * @param {function} callback - Recibe { ok: true }
     */
    this.reiniciarJuego = function (callback) {
        $.ajax({
            url: '/api/reiniciar',
            method: 'POST',
            success: function (data) {
                console.log("Juego reiniciado:", data);
                if (callback) callback(data);
            },
            error: function () {
                console.log("Error al reiniciar juego");
            }
        });
    };

}

// Instancia global para usar desde la web
var clienteRest = new ClienteRest();
