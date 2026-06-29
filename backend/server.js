let express = require('express')
let userRouter = require("./routes/user.routes");
let bookRouter = require("./routes/book.routes"); 
let rentalRouter = require("./routes/rental.routes")
const connectDB = require('./config/dbconnect')

let app = express()
app.use(express.json());

connectDB();
app.use("/", userRouter);
app.use("/books", bookRouter); 
app.use("/rentals", rentalRouter);
const PORT = 4444; 
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`); 
})
