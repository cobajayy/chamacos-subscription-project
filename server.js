const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require("express-session");

const isSignedIn = require("./middleware/is-signed-in.js");
const passUserToView = require("./middleware/pass-user-to-view.js");

const authController = require("./controller/auth.js");
const subscriptionsController = require("./controller/subscriptions.js");
const usersController = require("./controller/users.js");

const PORT = process.env.PORT ? process.env.PORT : "4000";

const path = require("path");

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passUserToView);

app.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect(`/users/${req.session.user._id}/subscriptions`);
  } else {
    res.render("home.ejs");
  }
});

app.use("/auth", authController);
app.use("/users/:userId/subscriptions", subscriptionsController);
app.use("/users", usersController);
app.use(isSignedIn);

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
