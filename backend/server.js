const express = require("express");
const cors = require("cors");

const userRouter = require("./routes/user.routes");
const bookRouter = require("./routes/book.routes");
const rentalRouter = require("./routes/rental.routes");
const dashboardRoute = require("./routes/dashboardRoutes");

const connectDB = require("./config/dbconnect");

require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use("/", userRouter);
app.use("/books", bookRouter);
app.use("/rentals", rentalRouter);
app.use("/dashboard", dashboardRoute);

const PORT = 4444;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});