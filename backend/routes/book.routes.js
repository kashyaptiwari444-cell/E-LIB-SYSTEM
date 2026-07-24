const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");
const upload = require("../middleware/upload");

const {
    showBooks,
    showBookDetails,
    addBook,
    editBook,
    deleteBook
} = require("../controllers/bookController");

router.get("/", showBooks);

router.get("/show-book-details/:id", showBookDetails);

router.post("/add-book", auth, adminOnly, upload.single("image"), addBook);

router.put("/edit-book/:id", auth, adminOnly, upload.single("image"), editBook);

router.delete("/delete-book/:id", auth, adminOnly, deleteBook);

module.exports = router;