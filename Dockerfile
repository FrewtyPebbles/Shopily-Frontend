FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 8080:80

CMD [ "serve", "dist", "-p", "8080" ]