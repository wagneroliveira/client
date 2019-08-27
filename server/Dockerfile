FROM node:9.11

ENV environment $NODE_ENV

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install -g

COPY . .

EXPOSE 3000

CMD node app.js