FROM node:16-alpine as builder
USER node

RUN mkdir -p /home/node/app
WORKDIR /home/node/app
WORKDIR '/app'
COPY --chown=node:node ./package.json ./
RUN npm install
COPY --chown=node:node ./ ./
EXPOSE 5173 
RUN npm run build

FROM nginx  
EXPOSE 5173
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html







