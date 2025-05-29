const express = require("express");
const path = require("path");
const modelo = require("./servidor/modelo.js");

const app = express();
const PORT = process.env.PORT || 3000;

let sistema = new modelo.Sistema();

// Middleware para recibir JSON
app.use(express.json());

// Servir archivos estáticos desde 'cliente'
app.use(express.static(path.join(__dirname, "cliente")));

// API REST - Ejemplos:
app.get("/api/num-jugadores", (req, res) => {
  try {
    res.json({ num: sistema.numeroUsuarios() });
  } catch (err) {
    console.error("Error en /api/num-jugadores:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


app.post("/api/agregar-jugador", (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ error: "Falta el nick" });

    const resultado = sistema.agregarUsuario(nombre);
    res.json(resultado);
  } catch (err) {
    console.error("Error en /api/agregar-jugador:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Obtener lista de usuarios
app.get("/api/usuarios", (req, res) => {
  try {
    const usuarios = sistema.obtenerUsuarios();
    res.json(Object.values(sistema.obtenerUsuarios()));
  } catch (err) {
    console.error("Error en /api/usuarios:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Consultar si un usuario está activo
app.get("/api/usuario-activo/:nick", (req, res) => {
  try {
    const nick = req.params.nick;
    const activo = sistema.usuarioActivo(nick); // true o false
    res.json({ activo });
  } catch (e) {
    console.error("Error en /api/usuario-activo/:nick:", e);
    res.status(500).json({ error: "Error interno" });
  }
});

// Eliminar usuario por nick
app.delete("/api/eliminar-usuario/:nick", (req, res) => {
  try {
    const nick = req.params.nick;
    const eliminado = sistema.eliminarUsuario(nick); // true o false
    res.json({ eliminado });
  } catch (e) {
    console.error("Error en /api/eliminar-usuario/:nick:", e);
    res.status(500).json({ error: "Error interno" });
  }
});

app.get("/api/secuencia", (req, res) => {
  try {
    const secuencia = sistema.juego.obtenerSecuencia();
    res.json({ secuencia });
  } catch (e) {
    res.status(500).json({ error: "Error al obtener secuencia" });
  }
});

app.post("/api/siguiente", (req, res) => {
  try {
    const secuencia = sistema.juego.generarSiguiente();
    res.json({ secuencia });
  } catch (e) {
    res.status(500).json({ error: "Error al generar secuencia" });
  }
});

app.post("/api/comprobar", (req, res) => {
  try {
    const { intento } = req.body;
    const resultado = sistema.juego.comprobarSecuencia(intento);
    res.json(resultado);
  } catch (e) {
    res.status(500).json({ error: "Error al comprobar intento" });
  }
});

app.post("/api/reiniciar", (req, res) => {
  try {
    sistema.juego.reiniciar();
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: "Error al reiniciar juego" });
  }
});


// Servir index.html por defecto (opcional con static, aquí es redundante)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "cliente", "index.html"));
});

app.listen(PORT, () => {
  console.log(`App está escuchando en http://localhost:${PORT}`);
});
