FROM node
EXPOSE 3000

WORKDIR /home/nodejs/powerplate


COPY ./dist .
COPY ./package.json .
RUN npm install
CMD node ./src/index.js
