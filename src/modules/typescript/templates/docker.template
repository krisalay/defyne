FROM node:12-alpine AS base

WORKDIR /app
COPY package*.json ./

RUN npm install --production

FROM base AS final

COPY . .

EXPOSE 80

CMD ["npm", "start"]
