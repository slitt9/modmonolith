const app = require('./app');
const config = require('./config');
const { initDb } = require('./shared/database/sqlite');

initDb();

app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
});
