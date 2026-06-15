const path = require('path');

const rootDir = path.join(__dirname, '../..');

module.exports = {
  port: process.env.PORT || 3001,
  sessionSecret: process.env.SESSION_SECRET || 'dev-secret-change-in-production',
  dbPath: process.env.DB_PATH || path.join(rootDir, 'data', 'app.db'),
  viewsPath: path.join(__dirname, '../views'),
  layoutPath: path.join(__dirname, '../shared/views'),
};
