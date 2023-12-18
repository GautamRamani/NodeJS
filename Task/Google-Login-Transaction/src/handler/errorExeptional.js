
async function handler(err, req, res,next) {
    let statusCode = 400 || 501 || err.status
    let message = err.message || "something went wrong"
    res.send({
        message,
        status: "errror",
        success: false,
        statusCode: statusCode
    })
}
module.exports = { handler }