const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "config.env"),
});

const app = require("./app");

//database
const { PORT, DOMAIN, DATABASE } = process.env;

mongoose
  .connect(DATABASE, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log("Database Connection failed!\n", err);
    mongoose.connection.close();
  });

const server = app.listen(PORT || 8000, () => {
  console.log(`Server is up at http://${DOMAIN}:${PORT}`);
});

//error handler
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED_REJECTION!   Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
