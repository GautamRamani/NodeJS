const mongoose = require('mongoose');

async function withTransaction(asyncFunction) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const result = await asyncFunction(session);
    await session.commitTransaction();
    session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    console.error(error);
    throw new Error('Transaction aborted');
  }
}

module.exports = withTransaction;
