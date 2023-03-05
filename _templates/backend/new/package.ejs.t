---
to: <%= outputPath %>/<%= appName %>/package.json
force: true
---
{
  "name": "<%= appName %>",
  "version": "1.0.0",
  "description": "Standalone Backend Boilerplate using NodeJS and Express",
  "main": "index.js",
  "scripts": {
    "test": "jest",
    "test-coverage": "concurrently 'npx jest tests' 'npx jest --coverage'",
    <% if(databases.length === 0) { _%>
    "start": "node index.js",
    <% } _%>
    "lint": "npx eslint --fix .",
    <% if(databases.length > 0) { _%>
    "db:create": "sequelize db:create",
    "db:up": "sequelize db:migrate",
    "db:down": "sequelize db:migrate:undo:all",
    "seed:up": "sequelize db:seed:all",
    "seed:down": "sequelize db:seed:undo:all",
    "start:server": "nodemon index.js",
    "start": "npm run db:create && npm run db:up && npm run seed:up && npm run start:server",
    <% } _%>
    "nodemon": "nodemon index.js"
  },
  "keywords": [
    "microservice",
    "backend",
    "NodeJS",
    "Express"
  ],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "concurrently": "^7.6.0",
    "nodemon": "^2.0.21",
    <% if(databases.length > 0) { _%>
    "sequelize-cli": "^6.6.0",
    <% } _%>
    "eslint": "^8.33.0"
  },
  "dependencies": {
    "express": "^4.18.2",
    <% if(databases.length > 0) { _%>
    "pg": "^8.9.0",
    "pg-hstore": "^2.3.4",
    "sequelize": "^6.29.0",
    <% } _%>
    "cors": "^2.8.5"
  }
}