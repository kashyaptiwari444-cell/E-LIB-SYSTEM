const Rental = require("../models/Rental");
const Book = require("../models/Book");
const User = require("../models/User");


// Issue Book
const issueBook = async (req, res) => {
    try {
        if (req.user.role !== "student") {
        return res.status(403).json({
            message: "Only students can issue books"
        });
        }

        const { book } = req.body;
        const student = req.user.id;

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

        const activeBooks = await Rental.countDocuments({
            student,
            returned: false
        });

        if (activeBooks >= 3) {
            return res.status(400).json({
                message: "Maximum 3 books can be issued."
            });
        }


        const issueDate = new Date();

        const autoReturnDate = new Date(issueDate);
        autoReturnDate.setDate(autoReturnDate.getDate() + 14);

        const rental = await Rental.create({
            student,
            book,
            issueDate,
            returnDate: autoReturnDate
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

            rental.fine = diff * 5; // ₹5 per day
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
// My Issued Books
const myIssuedBooks = async (req, res) => {
    try {

        const rentals = await Rental.find({
            student: req.user.id
        })
        .populate("book", "title author category quantity")
        .sort({ issueDate: -1 });

        res.status(200).json({
            total: rentals.length,
            rentals
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
    deleteRental,
    myIssuedBooks
};