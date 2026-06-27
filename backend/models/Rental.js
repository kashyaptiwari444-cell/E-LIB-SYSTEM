const mongoose = require('mongoose');
const rentalSchema = new mongoose.Schema({
    student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // was 'Student' — no such model exists
    required: true
    },

    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },

    issueDate: {
        type: Date,
        default: Date.now
    },

    returnDate: {
        type: Date,
        required: true
    },

    actualReturnDate: {
        type: Date,
        default: null
    },

    fine: {
        type: Number,
        default: 0,
        min: 0
    },

    returned: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Rental', rentalSchema);