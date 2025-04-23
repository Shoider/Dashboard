FROM node:23.10.0-alpine3.21

RUN apk add --no-cache curl

RUN addgroup -g 1001 front && adduser -D -u 1001 -G front front

WORKDIR /app

# Copia la carpeta 'dist' (con los archivos construidos de Vite)
COPY --chown=front ./dist .

# Copia tu configuración personalizada de Nginx para el dashboard (opcional)
COPY ./nginx/dashboard.conf /etc/nginx/conf.d/

# Copia las imagenes
COPY --chown=front public ./public

# Elimina la configuración default de Nginx
# RUN rm /etc/nginx/conf.d/default.conf

ENV NODE_ENV=production
ENV PORT=3000

RUN npm install sharp

USER front

EXPOSE 3039

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl --fail http://dashboard:3039 || exit 1

CMD ["node", "server.js"]