FROM node:19.0.0-alpine3.16 as firstEnv
WORKDIR /app
COPY package* . 
RUN ["npm", "ci", "--only=production"]
COPY . .

FROM node:19.0.0-alpine3.16 as secondEnv
WORKDIR /app
COPY --from=firstEnv /app/package* .
RUN ["npm", "ci", "--prod"]
COPY --from=firstEnv /app/src src

FROM alpine:3.16
WORKDIR /app
RUN apk --no-cache add nodejs && rm -rf /var/cache/apk/*
COPY --from=secondEnv /app .
CMD [ "node", "src/index.js" ]
EXPOSE 3000