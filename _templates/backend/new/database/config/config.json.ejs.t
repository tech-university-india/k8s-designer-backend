---
to:  "<%= (databases.length > 0 ? (outputPath + '/' + appName + '/database/config/config.json') : null) %>"
force: true
---
<% if(databases.length > 0) {%>
{
  "development": {
    "username": "<%= databases[0].dbUser %>",
    "password": "<%= databases[0].dbPassword %>",
    "database": "<%= databases[0].dbName %>",
    "host": "<%= databases[0].dbHost %>",
    "dialect": "postgres",
    "port": "<%= databases[0].dbPort %>"
  },
  "test": {
    "username": "<%= databases[0].dbUser %>",
    "password": "<%= databases[0].dbPassword %>",
    "database": "<%= databases[0].dbName %>",
    "host": "<%= databases[0].dbHost %>",
    "dialect": "postgres",
    "port": "<%= databases[0].dbPort %>"
  },
  "production": {
    "username": "<%= databases[0].dbUser %>",
    "password": "<%= databases[0].dbPassword %>",
    "database": "<%= databases[0].dbName %>",
    "host": "<%= databases[0].dbHost %>",
    "dialect": "postgres",
    "port": "<%= databases[0].dbPort %>"
  }
}
<% } %>