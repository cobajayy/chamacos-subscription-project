const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

router.get("/", async (req, res) => {
  const allUsers = await User.find();
  console.log(allUsers);
  res.render("../views/users/users-index.ejs", {
    allUsers: allUsers,
  });
});

router.get("/:userId", async (req, res) => {
  const foundUser = await User.findById(req.params.userId);

  res.render("users/users-show.ejs", {
    foundUser: foundUser,
  });
});

module.exports = router;
