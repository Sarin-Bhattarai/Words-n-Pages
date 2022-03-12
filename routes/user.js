const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

//import controllers
const { userById, read, update } = require("../controllers/user");

// router.get("/user/profile", getProfile);

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.get("/user/:userId", requireSignin, isAuth, read);

router.put("/user/:userId", requireSignin, isAuth, update);

//fetch the profile on the basis of jwt token in header

router.param("userId", userById);

module.exports = router;
