FROM node
EXPOSE 3000

WORKDIR /home/nodejs/powerplate

COPY ./package.json .
RUN npm install

COPY ./dist .
CMD node ./src/index.js
