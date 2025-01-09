require("dotenv").config({ path: "./.env", debug: true, encoding: "utf-8" });
const express = require("express");
const app = express();

// Database Connection
const { connectDatabase } = require("./models/db.js");
connectDatabase();

// Logger (logs)
const logger = require("morgan");
app.use(logger("tiny"));

// Cors policy
const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));

const session = require("express-session");
const cookieparser = require("cookie-parser");

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(cookieparser());

// Body Parser
const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use("/api/v1/user", require("./routes/userRoutes.js"));
app.use("/api/v1/products", require("./routes/productRoutes.js"));

const { generatedErrors } = require("./middlewares/error.js");
const ErrorHandler = require("./utils/ErrorHandler.js");
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Request Url Not Found! ${req.url}`, 404));
});

app.use(generatedErrors);

app.listen(process.env.PORT, () => {
  console.log(`Server Running On Port: ${process.env.PORT}!`);
});
