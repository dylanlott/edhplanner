# BUILD STEP
FROM node:11 AS base 
COPY ./ ./app
WORKDIR /app 
RUN npm install && npm run build

# FINAL STEP
FROM node:alpine
WORKDIR /dist
COPY --from=base /app /.
EXPOSE 3000
RUN node /dist/server/main.js