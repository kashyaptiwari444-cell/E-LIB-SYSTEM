const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

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

        const { name, email, password, role } = req.body;

        const existUser = await User.findOne({ email });

        if (existUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        // Welcome Email
        await sendEmail(
            user.email,
            "Welcome to 📚E-Library-System",
            `Hello ${user.name},
        📚Welcome to E-Library Management System.
        📚Your account has been created successfully.
        🎯Happy Reading!`
        );

        res.status(201).json({
            message: "User Registered Successfully",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

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


const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        // res.status(200).json({
        //     message: "Login Successful",
        //     token,
        //     role: user.role
        // });
        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


module.exports = {
    showHome,
    showDetailsPage,
    addUser,
    editUser,
    deleteUser,
    loginUser
};