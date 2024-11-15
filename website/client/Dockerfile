FROM node:23.1.0

WORKDIR /app

RUN npm install yarn --loglevel silly
COPY package.json package.json

RUN yarn install
RUN npm config set strict-ssl false --no-audit
RUN apt-get update && apt-get install -y iputils-ping

COPY . .
CMD ["npm", "run", "dev","--", "--host"]
