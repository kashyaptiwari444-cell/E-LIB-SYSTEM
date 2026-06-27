const express = require("express");
const router = express.Router();

const {
    issueBook,
    getAllRentals,
    returnBook,
    deleteRental
} = require("../controllers/rentalController");

router.post("/issue", issueBook);
router.get("/", getAllRentals);
router.put("/return/:id", returnBook);
router.delete("/:id", deleteRental);

module.exports = router;