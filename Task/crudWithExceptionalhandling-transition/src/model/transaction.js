const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    status: {
        type: String,
    },
});

let Transaction = mongoose.model('transaction', transactionSchema);

module.exports = Transaction;