const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");
console.log(require("../middleware/adminOnly"));

const {
    showBooks,
    showBookDetails,
    addBook,
    editBook,
    deleteBook
} = require("../controllers/bookController");

// console.log("auth:", auth);
// console.log("adminOnly:", adminOnly);
// console.log("addBook:", addBook);

router.get("/", auth, showBooks);

router.get("/show-book-details/:id", auth, showBookDetails);

router.post("/add-book", auth, adminOnly, addBook);

router.put("/edit-book/:id", auth, adminOnly, editBook);

router.delete("/delete-book/:id", auth, adminOnly, deleteBook);

module.exports = router;