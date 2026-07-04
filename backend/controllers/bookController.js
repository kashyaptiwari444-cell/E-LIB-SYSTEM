const Book = require('../models/Book');

let showBooks = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const search = req.query.search || "";
        const sort = req.query.sort || "createdAt";
        const order = req.query.order === "asc" ? 1 : -1;

        const query = {
            $or: [
                { title: { $regex: search, $options: "i" } },
                { author: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } }
            ]
        };

        const totalBooks = await Book.countDocuments(query);

        const books = await Book.find(query)
            .sort({ [sort]: order })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(totalBooks / limit),
            totalBooks,
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