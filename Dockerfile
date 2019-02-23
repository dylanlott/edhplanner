# BUILD STEP
FROM node:11 AS base 
COPY ./ ./app
WORKDIR /app 
RUN npm install && \
    npm run build && \
    echo $DB_URL 
EXPOSE 3000
CMD ["npm", "start"]