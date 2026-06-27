const Book = require('../models/Book');

let showBooks = async (req, res) => {
    try {
        const books = await Book.find();

        res.status(200).json({
            success: true,
            books
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

let showBookDetails = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        res.status(200).json({
            success: true,
            book
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

let addBook = async (req, res) => {
    try {
        const { title, author, category, quantity } = req.body;

        const book = await Book.create({
            title,
            author,
            category,
            quantity
        });

        res.status(201).json({
            success: true,
            message: 'Book added successfully',
            book
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

let editBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            book
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

let deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Book deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    showBooks,
    showBookDetails,
    addBook,
    editBook,
    deleteBook
};