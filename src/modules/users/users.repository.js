const { getDb } = require('../../shared/database/sqlite');

function findByEmail(email) {
  const db = getDb();
  return db
    .prepare('SELECT id, email, password_hash, created_at FROM users WHERE email = ?')
    .get(email);
}

function findById(id) {
  const db = getDb();
  return db
    .prepare('SELECT id, email, created_at FROM users WHERE id = ?')
    .get(id);
}

function create({ email, passwordHash }) {
  const db = getDb();
  const result = db
    .prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)')
    .run(email, passwordHash);
  return findById(result.lastInsertRowid);
}

module.exports = { findByEmail, findById, create };
