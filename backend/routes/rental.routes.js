const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");


const {
    issueBook,
    getAllRentals,
    returnBook,
    deleteRental,
    myIssuedBooks
} = require("../controllers/rentalController");

router.post("/issue", auth, issueBook);
router.get("/mybooks", auth, myIssuedBooks);
router.get("/", auth, adminOnly, getAllRentals);
router.put("/return/:id", auth, returnBook);
router.delete("/:id", auth, adminOnly, deleteRental);

module.exports = router;