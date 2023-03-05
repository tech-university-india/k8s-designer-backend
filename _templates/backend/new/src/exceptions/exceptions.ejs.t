---
to: output-boilerplates/<%= appName %>/src/exceptions/<%=appName%>.exceptions.js
force: true
---
class httpError extends Error {
  constructor(message, status) {
    super(message);
    this.message = message;
    this.status = status;
  }
}

module.exports = httpError; 