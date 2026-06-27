const Rental = require("../models/Rental");
const Book = require("../models/Book");
const User = require("../models/User");

// Issue Book
const issueBook = async (req, res) => {
    try {
        const { student, book, returnDate } = req.body;

        const bookData = await Book.findById(book);

        if (!bookData) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        if (bookData.quantity <= 0) {
            return res.status(400).json({
                message: "Book is out of stock"
            });
        }

        const rental = await Rental.create({
            student,
            book,
            returnDate
        });

        bookData.quantity -= 1;
        await bookData.save();

        res.status(201).json({
            message: "Book issued successfully",
            rental
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// Get All Rentals
const getAllRentals = async (req, res) => {
    try {

        const rentals = await Rental.find()
            .populate("student", "name email")
            .populate("book", "title author");

        res.json(rentals);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// Return Book
const returnBook = async (req, res) => {

    try {

        const rental = await Rental.findById(req.params.id);

        if (!rental) {
            return res.status(404).json({
                message: "Rental not found"
            });
        }

        if (rental.returned) {
            return res.status(400).json({
                message: "Book already returned"
            });
        }

        rental.returned = true;
        rental.actualReturnDate = new Date();

        // Fine Calculation
        const dueDate = new Date(rental.returnDate);
        const today = new Date();

        if (today > dueDate) {

            const diff =
                Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));

            rental.fine = diff * 10; // ₹10 per day
        }

        await rental.save();

        const book = await Book.findById(rental.book);

        if (book) {
            book.quantity += 1;
            await book.save();
        }

        res.json({
            message: "Book returned successfully",
            rental
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }

};

// Delete Rental
const deleteRental = async (req, res) => {

    try {

        const rental = await Rental.findByIdAndDelete(req.params.id);

        if (!rental) {
            return res.status(404).json({
                message: "Rental not found"
            });
        }

        res.json({
            message: "Rental deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }

};

module.exports = {
    issueBook,
    getAllRentals,
    returnBook,
    deleteRental
};