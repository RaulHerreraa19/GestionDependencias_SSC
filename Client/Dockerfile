FROM node:20

WORKDIR /app

ENV NODE_ENV=development

# Copia package.json y opcionalmente lock si lo tienes
COPY package.json ./
#COPY pnpm-lock.yaml ./

# Instala dependencias desde cero
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto de Vite
EXPOSE 5173

# Inicia el servidor de desarrollo con host accesible desde fuera del contenedor
CMD ["npm", "run", "dev", "--", "--host"]
