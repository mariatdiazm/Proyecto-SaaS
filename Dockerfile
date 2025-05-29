# Usa una imagen oficial de Node.js como base
FROM node:18

# Crea y establece el directorio de trabajo
WORKDIR /app

# Copia archivos del proyecto al contenedor
COPY package*.json ./
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto que utiliza Express
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
