const User = require('../models/User');

// Get All Users
const showHome = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Single User
const showDetailsPage = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add User
const addUser = async (req, res) => {
    try {
        const { name, email, role, password } = req.body;

        const user = await User.create({
            name,
            email,
            role,
            password
        });

        res.status(201).json({
            message: "Record Has Been Saved!",
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update User
const editUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        res.status(200).json({
            message: "Record Has Been Updated!",
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete User
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        res.status(200).json({
            message: "Record Has Been Deleted!"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    showHome,
    showDetailsPage,
    addUser,
    editUser,
    deleteUser
};