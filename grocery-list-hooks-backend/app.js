const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const groceryRouter = require("./routes/Grocery/GroceryRouter");
const errorController = require("./routes/utils/errorController");
const ErrorMessageHandlerClass = require("./routes/utils/ErrorMessageHandlerClass");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/grocery", groceryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.all("*", function (req, res, next) {
  next(
    new ErrorMessageHandlerClass(
      `Cannot find ${req.originalUrl} on this server! Check your URL`,
      404
    )
  );
});

app.use(errorController);

module.exports = app;