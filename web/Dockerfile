FROM node:16-alpine

WORKDIR /web

COPY package*.json ./

RUN npm install

COPY . ./web

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "run", "dev"]