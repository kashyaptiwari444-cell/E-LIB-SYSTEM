const Book = require("../models/Book");
const User = require("../models/User");
const Rental = require("../models/Rental");

const getDashboard = async (req, res) => {
    try {
        
        const totalBooks = await Book.countDocuments();

        const totalStudents = await User.countDocuments({
            role: "student"
        });

        const totalAdmins = await User.countDocuments({
            role: "admin"
        });

        const issuedBooks = await Rental.countDocuments({
            returned: false
        });

        const returnedBooks = await Rental.countDocuments({
            returned: true
        });

        const overdueBooks = await Rental.countDocuments({
            returned: false,
            returnDate: { $lt: new Date() }
        });

        const fineData = await Rental.aggregate([
            {
                $group: {
                    _id: null,
                    totalFine: { $sum: "$fine" }
                }
            }
        ]);

        const totalFineCollected =
            fineData.length > 0 ? fineData[0].totalFine : 0;

        res.status(200).json({
            totalBooks,
            totalStudents,
            totalAdmins,
            issuedBooks,
            returnedBooks,
            overdueBooks,
            totalFineCollected
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

module.exports = {
    getDashboard
};