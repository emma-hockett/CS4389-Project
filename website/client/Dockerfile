FROM node:23.1.0

WORKDIR /app

COPY package.json package.json
COPY package-lock.json packagelock.json

RUN npm install

COPY . .
CMD ["npm", "run", "dev"]
