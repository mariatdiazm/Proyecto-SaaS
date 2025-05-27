const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const modelo = require("./servidor/modelo.js");

const PORT = process.env.PORT || 3000;

let sistema = new modelo.Sistema();

// Servir archivos estáticos desde la carpeta 'cliente'
app.use(express.static(path.join(__dirname, "cliente")));

// Ruta raíz sirve el index.html
app.get("/", (request, response) => {
  try {
    let contenido = fs.readFileSync(path.join(__dirname, "cliente", "index.html"));
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.end(contenido);
  } catch (error) {
    response.statusCode = 500;
    response.end("Error al cargar la página");
  }
});

app.listen(PORT, () => {
  console.log(`App está escuchando en el puerto ${PORT}`);
});
