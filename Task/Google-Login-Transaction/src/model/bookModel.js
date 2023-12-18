const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

const bookSchema = new mongoose.Schema({
    bookName: { type: String, required: true, unique: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    price: { type: Number },
    qty: { type: Number },
    date: { type: Date, default: Date.now },
});
bookSchema.plugin(mongoosePaginate);
const Book = mongoose.model('book', bookSchema);
module.exports = { Book }