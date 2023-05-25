FROM node:15-alpine

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . ./server

ENV PORT=5000

EXPOSE 5000

RUN npx prisma generate

CMD ["npm", "run", "dev:migrate"]