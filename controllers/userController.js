const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../middleware/auth');

router.post('/register', (req, res) => {
  try {
    const { username, password, favorecido } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Usuário e senha obrigatórios' });
    const user = userService.registerUser({ username, password, favorecido });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Usuário e senha obrigatórios' });
    const user = userService.loginUser({ username, password });
    const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: '1h' });
    res.json({ user, token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

router.get('/', (req, res) => {
  res.json(userService.getUsers());
});

module.exports = router;
