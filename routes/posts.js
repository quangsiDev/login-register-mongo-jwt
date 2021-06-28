const router = require("express").Router();
const User = require("../model/user");
const verifyToken = require("./verifyToken");

router.get("/", verifyToken, async (req, res) => {
  // res.send(req.user);
  const user = await User.findOne({ _id: req.user });
  res.send(
    //   {
    //   posts: {
    //     title: "my random title",
    //     description: "random data you shouldnt access",
    //   },
    // }

    JSON.stringify(user)
  );
});

module.exports = router;
