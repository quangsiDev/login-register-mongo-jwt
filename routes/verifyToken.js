const jwt = require("jsonwebtoken");
// const dotevn = require("dotenv");
// dotevn.config();
module.exports = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");
  console.log("process.env.TOKEN_SECRET", process.env.TOKEN_SECRET);

  try {
    console.log("verified", process.env.TOKEN_SECRET);
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send(err);
  }
};
