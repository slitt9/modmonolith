const { validationResult } = require('express-validator');
const authService = require('./auth.service');
const { setFlash } = require('../../shared/middleware/flash');

function showRegister(req, res) {
  res.render('auth/register', { title: 'Register' });
}

async function register(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    setFlash(req, 'error', errors.array()[0].msg);
    return res.redirect('/register');
  }

  try {
    await authService.register({
      email: req.body.email,
      password: req.body.password,
    });
    setFlash(req, 'success', 'Account created. Please log in.');
    return res.redirect('/login');
  } catch (err) {
    if (err.status === 409) {
      setFlash(req, 'error', err.message);
      return res.redirect('/register');
    }
    return next(err);
  }
}

function showLogin(req, res) {
  res.render('auth/login', { title: 'Login' });
}

async function login(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    setFlash(req, 'error', errors.array()[0].msg);
    return res.redirect('/login');
  }

  try {
    const user = await authService.login({
      email: req.body.email,
      password: req.body.password,
    });

    if (!user) {
      setFlash(req, 'error', 'Invalid email or password.');
      return res.redirect('/login');
    }

    req.session.userId = user.id;
    return res.redirect('/');
  } catch (err) {
    return next(err);
  }
}

function logout(req, res) {
  req.session.destroy(() => {
    res.redirect('/login');
  });
}

function showHome(req, res) {
  const user = authService.getCurrentUser(req.session.userId);
  res.render('home', { title: 'Home', user });
}

module.exports = {
  showRegister,
  register,
  showLogin,
  login,
  logout,
  showHome,
};
