const express = require('express');
const router = express.Router();
const transferService = require('../services/transferService');

router.post('/', (req, res) => {
  try {
    const { from, to, amount } = req.body;
    if (!from || !to || typeof amount !== 'number') return res.status(400).json({ error: 'Dados obrigatórios: from, to, amount' });
    const result = transferService.transfer({ from, to, amount });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', (req, res) => {
  res.json(transferService.getTransfers());
});

module.exports = router;
