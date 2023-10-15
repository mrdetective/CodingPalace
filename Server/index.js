const express = require("express");
const cors = require("cors");
const connectDB = require("./config/DBConnection");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5001;

connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/codingfiles", require("./routes/CodeRoutes"));
app.use(errorHandler);
app.listen(port);
