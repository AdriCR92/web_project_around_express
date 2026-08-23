import express from "express";
import mongoose from "mongoose";

import { cardsRouter } from "./routes/cards.js";
import { usersRouter } from "./routes/users.js";
import {
    errorHandler,
    notFoundHandler,
} from "./middlewares/error-handler.js";    

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/aroundb")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

// Middleware to parse JSON request bodies
app.use(express.json());

app.use((req, res, next) => {
    req.user ={
        _id: "6a8a55c9aa18e6db86ea31c5"    
    };
    next();
});

// Use routers for different routes
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});