FROM node:18-alpine

RUN apk --no-cache add dos2unix && mkdir -p /app && chown node:node /app
WORKDIR /app

USER node
COPY --chown=node:node package.json .

RUN npm install --legacy-peer-deps

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "npm", "start" ]
