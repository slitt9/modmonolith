const usersRepository = require('./users.repository');

function findByEmail(email) {
  return usersRepository.findByEmail(email);
}

function findById(id) {
  return usersRepository.findById(id);
}

function create({ email, passwordHash }) {
  return usersRepository.create({ email, passwordHash });
}

function emailExists(email) {
  return Boolean(findByEmail(email));
}

module.exports = { findByEmail, findById, create, emailExists };
