const express = require("express");
const {
  test,
  signup,
  current,
  signout,
  signin,
} = require("../controllers/userController.js");
const { userIsAuth } = require("../middlewares/auth.js");
const router = express.Router();

router.get("/test", test);

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/current", userIsAuth, current);

router.get("/signout", userIsAuth, signout);

module.exports = router;
