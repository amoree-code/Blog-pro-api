const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRouter = require('./routes/authRoute');
const usersRouter = require('./routes/usersRoute');
const postsRouter = require("./routes/postsRoute");
const commentsRouter = require("./routes/commentsRoute");
const categoriesRouter = require("./routes/categoriesRoute");
const path = require('path');

const app = express();

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1); 
    }
};
console.log("MongoDB URL:", process.env.MONGO_URL);

connectDB();

// Middleware
app.use(cors({
    origin: ["http://localhost:3000", "social-client-fahad.ddnsfree.com"],
}));

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentsRouter); 
app.use("/api/categories", categoriesRouter); 

// Serve static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(process.env.PORT ||8001, () => {
    console.log("Server is running on port 8001");
});
