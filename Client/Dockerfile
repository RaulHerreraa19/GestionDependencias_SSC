FROM node:20

WORKDIR /app

ENV NODE_ENV=development

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]

# Etapa 1: Build
# FROM node:20 AS builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN cp ./config.qa.json ./config.json && npm run build

# # Etapa 2: Servir la app (por ejemplo con nginx)
# FROM nginx:alpine
# COPY --from=builder /app/dist ./public-html/
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
