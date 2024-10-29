FROM node:20 as build

WORKDIR /app

COPY *.json .
COPY src src

RUN npm install
RUN npm run build

FROM node:20-slim

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist .

EXPOSE 3000
CMD ["node", "main.js"]
