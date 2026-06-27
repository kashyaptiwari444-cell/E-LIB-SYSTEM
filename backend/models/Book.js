const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [1, 'Title must be at least 1 character'],
        maxlength: [50, 'Title cannot be more than 50 characters']
    },

    author: {
        type: String,
        required: [true, 'Author is required'],
        minlength: [3, 'Author name must be at least 3 characters'],
        maxlength: [50, 'Author name cannot be more than 50 characters']
    },

    category: {
        type: String,
        required: [true, 'Category is required'],
        minlength: [3, 'Category must be at least 3 characters'],
        maxlength: [50, 'Category cannot be more than 50 characters']
    },

    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity cannot be negative']
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Book', bookSchema);