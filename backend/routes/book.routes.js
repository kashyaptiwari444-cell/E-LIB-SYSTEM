const express = require("express");
const router = express.Router();

const {
    showBooks,
    showBookDetails,
    addBook,
    editBook,
    deleteBook
} = require("../controllers/bookController");

router.get("/", showBooks);
router.get("/show-book-details/:id", showBookDetails);

router.post("/add-book", addBook);

router.put("/edit-book/:id", editBook);

router.delete("/delete-book/:id", deleteBook);

module.exports = router;