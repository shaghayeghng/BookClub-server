const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const authorRouter = require("./routes/authorRouter");
const bookRouter = require("./routes/bookRouter")
const bookShelvesRouter = require("./routes/bookShelvesRouter");
const commentRouter = require("./routes/commentRouter");
const libraryRouter = require("./routes/libraryRouter");
const orderRouter = require("./routes/orderRouter");
const publisherRouter = require("./routes/publisherRouter");


const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use('/auth', authRouter);
app.use("/user", userRouter);
app.use("/book", bookRouter);
app.use("/bookShelves", bookShelvesRouter);
app.use("/order", orderRouter);
app.use("/comment", commentRouter);
app.use("/author", authorRouter);
app.use("/library", libraryRouter);
app.use("/publisher", publisherRouter);


module.exports = app;
