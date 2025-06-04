require("dotenv").config();
const express = require("express");
const app = express();
const connectToDB = require("./config/db");
connectToDB();

const indexRouter = require("./routes/index.routes");

app.use("/", indexRouter);

app.listen(3000);
