const express = require('express');
const authController = require('./auth.controller');
const { registerRules, loginRules } = require('./auth.validation');
const requireAuth = require('../../shared/middleware/requireAuth');

const router = express.Router();

router.get('/register', authController.showRegister);
router.post('/register', registerRules, authController.register);

router.get('/login', authController.showLogin);
router.post('/login', loginRules, authController.login);

router.post('/logout', requireAuth, authController.logout);

router.get('/', requireAuth, authController.showHome);

module.exports = router;
