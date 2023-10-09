const express = require("express");
const connectDB = require("./config/DBConnection");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5001;

connectDB();
app.use(express.json());
app.use("api/users", require("./routes/userRoutes"));
app.use(errorHandler);
app.listen(port);
