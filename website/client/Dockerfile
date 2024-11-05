FROM node:23.1.0

WORKDIR /app

COPY package.json package.json

RUN npm install

COPY . .
CMD ["npm","i"]
CMD ["npm","run","build"]
CMD ["npm", "run", "dev","--host"]
