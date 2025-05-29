const controlWeb = {
    init: function () {
        document.getElementById("btnAgregar").addEventListener("click", this.agregarUsuario);
        document.getElementById("btnVerUsuarios").addEventListener("click", this.mostrarObtenerUsuarios);
        document.getElementById("btnEliminarUsuario").addEventListener("click", this.eliminarUsuario);
        document.getElementById("btnVerSecuencia").addEventListener("click", this.verSecuencia);
        document.getElementById("btnSiguiente").addEventListener("click", this.generarSiguiente);
        document.getElementById("btnComprobar").addEventListener("click", this.comprobarIntento);
        document.getElementById("btnReiniciar").addEventListener("click", this.reiniciarJuego);

        this.actualizarNumero();
    },

    agregarUsuario: function () {
        const nombre = document.getElementById("nombreJugador").value;
        clienteRest.agregarUsuario(nombre, (data) => {
            if (data && data.nick !== -1) {
                controlWeb.actualizarNumero();
                controlWeb.mensaje("Usuario registrado correctamente");
            } else {
                controlWeb.mensaje("El nick ya está en uso");
            }
        });
    },

    mostrarObtenerUsuarios: function () {
        clienteRest.obtenerUsuarios((usuarios) => {
            const lista = Object.values(usuarios)
                .map(u => `<li>${u.nick}</li>`)
                .join('');
            controlWeb.mensaje(`<ul>${lista}</ul>`, "info");
        });
    },

    mostrarNumeroUsuarios: function () {
        clienteRest.numeroUsuarios((data) => {
            controlWeb.mensaje(`Usuarios registrados actualmente: <strong>${data.num}</strong>`, "primary");
        });
    },
    mostrarUsuarioActivo: function () {
        const html = `
      <div class="form-group">
        <input type="text" id="nickActivo" class="form-control" placeholder="Nick a consultar">
        <button class="btn btn-secondary mt-2" id="btnActivo">¿Está activo?</button>
      </div>
    `;
        document.getElementById("output").innerHTML = html;

        document.getElementById("btnActivo").addEventListener("click", () => {
            const nick = document.getElementById("nickActivo").value;
            clienteRest.usuarioActivo(nick, (activo) => {
                if (activo) {
                    controlWeb.mensaje(`✅ El usuario <strong>${nick}</strong> está activo`, "success");
                } else {
                    controlWeb.mensaje(`❌ El usuario <strong>${nick}</strong> no está activo`, "danger");
                }
            });
        });
    },

    eliminarUsuario: function () {
        const nombre = document.getElementById("nombreJugador").value;
        clienteRest.eliminarUsuario(nombre, () => {
            controlWeb.actualizarNumero();
            controlWeb.mensaje("Usuario eliminado (si existía)");
        });
    },

    verSecuencia: function () {
        clienteRest.obtenerSecuencia((secuencia) => {
            controlWeb.mensaje("Secuencia actual: " + secuencia.join(" → "), "info", 1500);

        });
    },

    generarSiguiente: function () {
        clienteRest.generarSiguiente((secuencia) => {
            controlWeb.mensaje("Nueva secuencia: " + secuencia.join(" → "), "info", 1000);
        });
    },

    comprobarIntento: function () {
        const intentoRaw = document.getElementById("intento").value.trim();
        const intento = intentoRaw.split(",").map(x => x.trim());
        clienteRest.comprobarSecuencia(intento, (res) => {
            if (res.exito) {
                controlWeb.mensaje("¡Secuencia correcta! 🟢");
            } else {
                controlWeb.mensaje("❌ Incorrecto. Te equivocaste en la posición: " + res.correctoHasta, "info", 2000);
            }
        });
    },

    reiniciarJuego: function () {
        clienteRest.reiniciarJuego(() => {
            controlWeb.mensaje("Juego reiniciado correctamente.");
        });
    },

    actualizarNumero: function () {
        clienteRest.numeroUsuarios((data) => {
            document.getElementById("numJugadores").textContent = data.num;
        });
    },

    mensaje: function (html, tipo = "info", duracion = 1500) {
        const contenedor = document.getElementById("output");
        contenedor.innerHTML = `
    <div id="mensaje-temporal" class="alert alert-${tipo} mt-3">${html}</div>
  `;

        setTimeout(() => {
            const mensaje = document.getElementById("mensaje-temporal");
            if (mensaje) mensaje.remove();
        }, duracion);
    }

};

// clienteRest debe estar definido antes
window.addEventListener("load", () => {
    clienteRest = new ClienteRest();
    controlWeb.init();
});
