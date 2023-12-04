const mongoose = require('mongoose');
const Transaction = require("../model/transaction");
const { init } = require("../conections/mongodb");

async function performTransaction(req, res) {
    let client;

    try {
        client = await init();

        // Start a session to enable transactions
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Perform operations within the transaction

            const { option, name } = req.body;

            if (option === 'update') {
                // Assuming Transaction is a Mongoose model
                await Transaction.updateOne({ name }, { $set: { status: 'true' } });
            } else if (option === 'insert') {
                // Assuming Transaction is a Mongoose model
                await Transaction.create({ name, status: 'false' });
            } else {
                // Invalid option
                throw new Error('Invalid option');
            }

            // If everything is successful, commit the transaction
            await session.commitTransaction();
            console.log('Transaction committed successfully');
            res.status(200).json({ message: 'Transaction committed successfully' });
        } catch (error) {
            // If any operation fails, roll back the entire transaction
            await session.abortTransaction();
            console.error('Transaction failed, rolled back:', error.message);
            res.status(500).json({ error: 'Transaction failed, rolled back' });
        } finally {
            // End the session
            console.log('Transaction completed successfully in finally');
            session.endSession();
        }
    } catch (error) {
        console.error('Error performing transaction:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        // Close the MongoDB connection
        mongoose.connection.close();
    }
}

module.exports = { performTransaction };

// const mongoose = require('mongoose');
// const Source = require("../models/source");
// const Destination = require("../models/destination");
// const { init } = require("../connections/mongodb");

// async function performTransaction(req, res) {
//     let client;

//     try {
//         client = await init();

//         // Start a session to enable transactions
//         const session = await mongoose.startSession();
//         session.startTransaction();

//         try {
//             // Perform operations within the transaction

//             const { documentId } = req.body;

//             // Assuming Source and Destination are Mongoose models
//             const sourceDocument = await Source.findById(documentId);

//             if (!sourceDocument) {
//                 throw new Error('Source document not found');
//             }

//             // Move the document from Source to Destination
//             const destinationDocument = new Destination({
//                 data: sourceDocument.data,
//                 timestamp: new Date()
//             });

//             await destinationDocument.save();

//             // Remove the document from Source
//             await Source.findByIdAndDelete(documentId);

//             // If everything is successful, commit the transaction
//             await session.commitTransaction();
//             console.log('Transaction committed successfully');
//             res.status(200).json({ message: 'Transaction committed successfully' });
//         } catch (error) {
//             // If any operation fails, roll back the entire transaction
//             await session.abortTransaction();
//             console.error('Transaction failed, rolled back:', error.message);
//             res.status(500).json({ error: 'Transaction failed, rolled back' });
//         } finally {
//             // End the session
//             session.endSession();
//         }
//     } catch (error) {
//         console.error('Error performing transaction:', error.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//     } finally {
//         // Close the MongoDB connection
//         mongoose.connection.close();
//     }
// }

// module.exports = { performTransaction };
