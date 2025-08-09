const users = require('../models/userModel');
const transfers = require('../models/transferModel');

function transfer({ from, to, amount }) {
  const sender = users.find(u => u.username === from);
  const recipient = users.find(u => u.username === to);
  if (!sender || !recipient) throw new Error('Usuário não encontrado-BUG');
  if (recipient.favorecido || amount < 5000) {
    transfers.push({ from, to, amount, date: new Date() });
    return { from, to, amount };
  } else {
    throw new Error('Transferência não permitida para não favorecido acima de R$ 5.000,00');
  }
}

function getTransfers() {
  return transfers;
}

module.exports = { transfer, getTransfers };
