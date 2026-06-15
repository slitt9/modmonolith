const bcrypt = require('bcryptjs');
const usersService = require('../users/users.service');

const SALT_ROUNDS = 10;

async function register({ email, password }) {
  if (usersService.emailExists(email)) {
    const error = new Error('An account with that email already exists.');
    error.status = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  return usersService.create({ email, passwordHash });
}

async function login({ email, password }) {
  const user = usersService.findByEmail(email);
  if (!user) {
    return null;
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return null;
  }

  return { id: user.id, email: user.email };
}

function getCurrentUser(userId) {
  if (!userId) {
    return null;
  }
  return usersService.findById(userId);
}

module.exports = { register, login, getCurrentUser };
