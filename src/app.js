const path = require('path');
const fs = require('fs');
const express = require('express');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const config = require('./config');
const authRoutes = require('./modules/auth/auth.routes');
const errorHandler = require('./shared/middleware/errorHandler');
const { flashMiddleware } = require('./shared/middleware/flash');

const dataDir = path.dirname(config.dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const app = express();

app.set('view engine', 'ejs');
app.set('views', config.viewsPath);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    store: new SQLiteStore({ db: 'sessions.db', dir: dataDir }),
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(flashMiddleware);

app.use(authRoutes);

app.use(errorHandler);

module.exports = app;
