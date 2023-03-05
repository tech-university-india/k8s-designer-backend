---
to: output-boilerplates/<%= appName %>/package.json
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
    "start": "node index.js",
    "lint": "npx eslint --fix .",
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
    "eslint": "^8.33.0",
    "nodemon": "^2.0.21"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2"
  }
}