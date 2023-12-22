const { validate_addBook, validate_updateQty, validate_deleteBook, validate_buyBook } = require("../validation/validate_book")
const { Book } = require("../model/bookModel");
const { User } = require("../model/userModel");
const Transaction = require('../model/transaction');
const withTransaction = require('../services/transactionServices');

async function addBook(req, res) {
    try {
        const data = req.body;
        const userId = req.user._id
        const { error, value: payload } = await validate_addBook(data)
        if (error) {
            return res.send({ status: "error", success: false, message: error.details[0].message })
        } else {
            let isBook = await Book.findOne({ _id: userId, bookName: payload.bookName })
            if (!isBook) {

                let user = await User.findOne({ _id: userId })
                if (user.type === 'Seller') {
                    let createBook = await Book.create({
                        bookName: payload.bookName,
                        sellerId: userId,
                        price: payload.price,
                        qty: payload.qty
                    })
                    return res.status(200).send({ data: createBook, success: true, message: "Book has been created succesfully" })
                } else {
                    return res.status(400).send({ status: "error", success: false, message: "Buyer can not add the book" })
                }
            } else {
                return res.status(400).send({ status: "error", success: false, message: "Book already exist, please add new Book!!" })
            }
        }

    } catch (error) {
        console.log(error);
    }
}

async function updateBook(req, res) {
    try {
        const data = req.body;
        const userId = req.user._id
        const { error, value: payload } = await validate_updateQty(data)
        if (error) {
            return res.send({ status: "error", success: false, message: error.details[0].message })
        } else {
            let isBook = await Book.findOne({ sellerId: userId, bookName: payload.bookName })
            if (isBook) {
                let updatebook = await Book.findOneAndUpdate({ sellerId: userId, bookName: isBook.bookName }, {
                    $set: {
                        qty: payload.qty
                    }
                }, { new: true, upsert: true })
                return res.status(200).send({ data: updatebook, success: true, message: "Book has been updated succesfully" })
            } else {
                return res.status(400).send({ status: "error", success: false, message: "Book not found" })
            }
        }

    } catch (error) {
        console.log(error);
    }
}

// async function buyBook(req, res) {
//     try {
//         const data = req.body;
//         const userId = req.user._id
//         const { error, value: payload } = await validate_buyBook(data)
//         if (error) {
//             return res.send({ status: "error", success: false, message: error.details[0].message })
//         } else {
//             let book = await Book.findOne({ bookName: payload.bookName })
//             if (book) {
//                 if (book.qty > 0) {
//                     let user = await User.findOne({ _id: userId })
//                     if (user.wallet >= book.price * payload.qty) {

//                         let updatedQty = book.qty - payload.qty;
//                         await Book.findOneAndUpdate({ sellerId: book.sellerId, bookName: book.bookName }, {
//                             $set: {
//                                 qty: updatedQty
//                             }
//                         })

//                         let updateBuyerWallet = user.wallet - book.price * payload.qty;
//                         await User.findOneAndUpdate({ _id: userId }, {
//                             $set: {
//                                 wallet: updateBuyerWallet
//                             }
//                         })
//                         let seller = await User.findOne({ _id: book.sellerId })
//                         let updateSellerWallet = seller.wallet + book.price * payload.qty;
//                         await Book.findOneAndUpdate({ sellerId: book.sellerId }, {
//                             $set: {
//                                 wallet: updateSellerWallet
//                             }
//                         })
//                         return res.status(200).send({ data: {}, success: true, message: "book has been buy succesfully" })
//                     } else {
//                         return res.status(400).send({ status: "error", success: false, message: "user has insufficient balance" })
//                     }
//                 } else {
//                     return res.status(400).send({ status: "error", success: false, message: "currently book not available!!" })
//                 }
//             } else {
//                 return res.status(400).send({ status: "error", success: false, message: "Book not found!!" })
//             }
//         }

//     } catch (error) {
//         console.log(error);
//     }
// }

async function buyBook(req, res) {
    try {
        const { error, value: payload } = await validate_buyBook(req.body);
        const userId = req.user._id;

        if (error) {
            return { status: "error", success: false, message: error.details[0].message };
        }

        const result = await withTransaction(async (session) => {

            const book = await Book.findOne({ bookName: payload.bookName }).session(session);

            if (!book) {
                return { status: "error", success: false, message: "Book not found!!" };
            }

            const isBookQty = await Book.findOne({
                qty: { $gt: 0, $lte: payload.qty }
            }).session(session);

            if (!isBookQty) {
                return { status: "error", success: false, message: "Please check book qty!!" };
            }

            const user = await User.findOne({ _id: userId }).session(session);

            if (!user || user.wallet < book.price * payload.qty) {
                return { status: "error", success: false, message: "User has insufficient balance" };
            }

            const updatedQty = book.qty - payload.qty;
            const updateBuyerWallet = user.wallet - book.price * payload.qty;
            const updateSellerWallet = book.price * payload.qty;

            await Promise.all([
                Book.findOneAndUpdate({ sellerId: book.sellerId, bookName: book.bookName }, { $set: { qty: updatedQty } }).session(session),
                User.findOneAndUpdate({ _id: userId }, { $set: { wallet: updateBuyerWallet } }).session(session),
                User.findOneAndUpdate({ _id: book.sellerId }, { $inc: { wallet: updateSellerWallet } }).session(session)
            ]);

            const transaction = new Transaction({
                userId,
                bookId: book._id,
                quantity: payload.qty,
                amount: book.price * payload.qty,
                transactionType: 'buyBook',
            });

            await transaction.save({ session });

            return { success: true, message: "Book has been bought successfully" };
        });

        return res.status(200).send({ data: {}, ...result });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: "error", success: false, message: "Internal server error" });
    }
}

async function getbookV2(req, res) {
    try {
        const { page, limit } = req.body;
        const userId = req.user._id

        let user = await User.findOne({ _id: userId })

        if (user) {

            let options = {
                page: page ? page : 1,
                limit: limit ? limit : 5
            }

            let book = await Book.paginate({}, options)
            return res.status(200).send({ data: book, success: true, message: "Book has been Fetched succesfully" })

        } else {
            return res.status(400).send({ status: "error", success: false, message: "User not found" })
        }


    } catch (error) {
        console.log(error);
    }
}

async function deleteBook(req, res) {
    try {
        const data = req.body;
        const userId = req.user._id
        const { error, value: payload } = await validate_deleteBook(data)
        if (error) {
            return res.send({ status: "error", success: false, message: error.details[0].message })
        } else {
            let user = await User.findOne({ _id: userId, type: "Seller" })
            if (user) {
                let isBook = await Book.findOne({ _id: userId, bookName: payload.bookName })
                if (isBook) {
                    await Book.findOneAndDelete({ _id: userId, bookName: isBook.bookName })
                    return res.status(200).send({ data: {}, success: true, message: "Book has been deleted succesfully" })
                } else {
                    return res.status(400).send({ status: "error", success: false, message: "Book not found" })
                }
            } else {
                return res.status(400).send({ status: "error", success: false, message: "User not found" })
            }
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = { addBook, updateBook, buyBook, getbookV2, deleteBook }