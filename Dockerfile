FROM node:20-buster-slim as base

WORKDIR /app
COPY ./package.json ./package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

FROM base as dev
ENV NODE_ENV=development
CMD ["npm", "run", "start"]

FROM base as prod
RUN npm install --production
ENV NODE_ENV=production
CMD ["npm", "run", "start"]
