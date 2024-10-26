FROM node:12.18.1

WORKDIR /app

COPY package.json package.json
COPY package-lock.json packagelock.json

RUN npm install

COPY . .
CMD ["npm", "start"]
