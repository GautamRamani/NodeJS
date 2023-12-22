const express = require("express")
const router = express()
const { health, signUp, login, authGoogle, authGoogleCallback } = require("../controller/userController")
const { auth, refreshToken } = require("../auth/auth")
const { addBook, updateBook, buyBook, deleteBook, getbookV2 } = require("../controller/bookController")

//health
router.get("/health", health)

//signup
router.post("/signUp", signUp)
router.post("/login", login)

//google login
router.get("/auth/google", authGoogle)
router.get("/auth/google/callback", authGoogleCallback)

//books
router.post("/getbookV2", auth, refreshToken, getbookV2)
router.post("/buyBook", auth, refreshToken, buyBook)
router.post("/addBook", auth, refreshToken, addBook)
router.post("/updateBook", auth, refreshToken, updateBook)
router.post("/deleteBook", auth, refreshToken, deleteBook)

module.exports = { router }