FROM node:16-alpine3.16 as baseEnv
WORKDIR /app
COPY package* . 
RUN ["npm", "ci", "--only=production"]
COPY . .

FROM alpine:3.16
WORKDIR /app
RUN apk --no-cache add nodejs && rm -rf /var/cache/apk/*
COPY --from=baseEnv /app .
CMD [ "node", "index.js" ]
EXPOSE 3000