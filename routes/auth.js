const router = require("express").Router();
const User = require("../model/user");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// VALIDATION

router.post("/register", async (req, res) => {
  // Let validate the data before we create a user

  const { error } = registerValidation(req.body);
  // loginValidation
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    // password: req.body.password,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({ user: user.id });
  } catch (err) {
    res.status(400).send("error:");
  }
});
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // checking if the email exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is not found!");
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) res.status(400).send("Password is not valid");
  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
