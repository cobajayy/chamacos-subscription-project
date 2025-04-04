const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

const bcrypt = require("bcrypt");

router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});

router.post("/sign-up", async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username });
  if (userInDatabase) {
    return res.send("username already taken.");
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.send("password and confirm password must match");
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashedPassword;

  const user = await User.create(req.body)

  req.session.user = {
    username: user.username,
  }

  req.session.save(() => {
    res.redirect("/")
  })
})

router.get("/sign-in", (req, res) => {
  res.render("auth/sign-in.ejs");
});

router.post("/sign-in", async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (!userInDatabase) {
      return res.send("login failed. please try again.");
    }
    const validPassword = bcrypt.compareSync(
      req.body.password,
      userInDatabase.password
    );
    if (!validPassword) {
      return res.send("login failed. please try again.");
    }
    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id,
    };
    req.session.save(() => {
      res.redirect("/");
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/sign-out", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
