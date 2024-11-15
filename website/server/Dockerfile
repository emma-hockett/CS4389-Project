FROM node:23.1.0

WORKDIR /app

RUN npm install yarn --loglevel silly
COPY package.json package.json
COPY package-lock.json packagelock.json

RUN yarn install
RUN apt-get update && apt-get install -y msmtp liboauth2-0
COPY .msmtprc /etc/msmtprc
COPY appendToProfile .
RUN cat appendToProfile >> /etc/profile


COPY . .
CMD ["npm", "start"]
