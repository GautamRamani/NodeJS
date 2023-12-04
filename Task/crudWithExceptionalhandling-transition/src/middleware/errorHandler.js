let handler = (error, req, res, next) => {
    const statusCode = 404 || 500 || error.status;
    const message = error.message || 'Something went wrong';
    res.send({
        message,
        status: 'error',
        success: false,
        statusCode,
    });
};

module.exports = handler;