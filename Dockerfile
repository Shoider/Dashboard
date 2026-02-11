FROM node:25-alpine3.22


# Instalación de dependencias del sistema
RUN apk add --no-cache curl

# Creación de usuario no root
RUN addgroup -g 1001 front && \
    adduser -D -u 1001 -G front front

WORKDIR /app

# Copiar solo lo necesario para la instalación de dependencias primero
COPY --chown=front package.json package-lock.json ./

# Instalar dependencias de producción
RUN npm ci --only=production && \
    npm install sharp && \
    npm cache clean --force

# Copiar el resto de la aplicación
COPY --chown=front ./dist ./dist
COPY --chown=front public ./public

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3039
ENV HOST=0.0.0.0

# Permisos DEBUG

RUN chown -R front:front /app
USER front

# Healthcheck mejorado
HEALTHCHECK --interval=300s --timeout=30s --start-period=10s --retries=3 \
    CMD curl -f http://dashboard:3039 || exit 1

# Usar serve para servir la aplicación estática
CMD ["npx", "serve", "-s", "dist", "-l", "tcp://0.0.0.0:3039"]