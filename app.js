const express = require("express");
const app = express();

const indexRouter = require("./routes/index.routes");
app.use("/", indexRouter);

app.listen(3000);
