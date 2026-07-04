const express = require("express");
const router = express.Router();

console.log("Dashboard Route Loaded");

const auth = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");

const {
    getDashboard
} = require("../controllers/dashboardController");

// Admin Dashboard
router.get("/", auth, adminOnly, getDashboard);

module.exports = router;