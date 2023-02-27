FROM node

COPY ./package*.json /home/node/bot-dvfl/
WORKDIR /home/node/bot-dvfl/
RUN npm install
COPY . .
CMD ["npm", "run", "start"]
