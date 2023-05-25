FROM node:15-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./app

ENV PORT=5000

EXPOSE 5000

RUN npx prisma generate

CMD ["npm", "run", "dev:migrate"]

