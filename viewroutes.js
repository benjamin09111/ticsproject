const express = require("express");
const {Router} = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = "transfer-api";
const path = require("path");
const authenticateToken = require("./middleware");

router.use(express.json({}));
router.use(express.static(path.join(__dirname, "public")));

router.get("/", (req, res) => {
    res.sendFile("index.html");
});

router.get("/login", (req, res) => {
    const filePath = path.resolve(__dirname, 'public', 'login.html');
    res.sendFile(filePath);
});

router.get("/register", (req, res) => {
    const filePath = path.resolve(__dirname, 'public', 'register.html');
    res.sendFile(filePath);
});

router.get("/home", authenticateToken, (req, res) => {
    const filePath = path.resolve(__dirname, 'public', 'home.html');
    res.sendFile(filePath);
});

router.get("/rellenar", authenticateToken, (req, res) => {
    const filePath = path.resolve(__dirname, 'public', 'rellenar.html');
    res.sendFile(filePath);
});

router.get("/fallo", authenticateToken, (req, res) => {
    const filePath = path.resolve(__dirname, 'public', 'fallo.html');
    res.sendFile(filePath);
    //
});

router.get("/info", authenticateToken, (req, res) => {
    const filePath = path.resolve(__dirname, 'public', 'info.html');
    res.sendFile(filePath);
});



module.exports = router;