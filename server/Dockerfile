FROM node:12

# react
WORKDIR /app/server

COPY package*.json /app/server

RUN npm install

COPY . /app/server

EXPOSE 8080

CMD [ "npm", "start" ]