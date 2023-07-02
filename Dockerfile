FROM node AS dependencies
WORKDIR /app
COPY package.json .
FROM node AS development
WORKDIR /app
COPY --from=dependencies /app/package.json .
RUN npm i
COPY . .
CMD [ "npm","run","dev"]
FROM node AS production
WORKDIR /app
COPY --from=dependencies /app/package.json .
RUN npm i --only=production
COPY . .
CMD [ "npm","run","start"]


