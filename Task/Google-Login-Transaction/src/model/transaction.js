const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true },
    amount: { type: Number, required: true },
    transactionType: { type: String, enum: ['buyBook'], required: true },
    createdAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;