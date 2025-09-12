
const express = require('express');
const router = express.Router();
const transferService = require('../services/transferService');
const { authenticateToken } = require('../middleware/auth');


router.post('/', authenticateToken, (req, res) => {
  try {
    const { from, to, amount } = req.body;
    if (!from || !to || typeof amount !== 'number') return res.status(400).json({ error: 'Dados obrigatórios: from, to, amount' });
    const result = transferService.transfer({ from, to, amount });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get('/', authenticateToken, (req, res) => {
  res.json(transferService.getTransfers());
});

module.exports = router;
