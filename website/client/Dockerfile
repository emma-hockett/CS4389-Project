FROM node:23.1.0

WORKDIR /app

COPY package.json package.json
COPY package-lock.json packagelock.json

RUN npm install
RUN apt-get update && apt-get install -y iputils-ping

COPY . .
CMD ["npm", "run", "dev","--host"]
