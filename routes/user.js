const express = require("express");
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById, read, update } = require("../controllers/user");
const { userByJwt } = require("../middlewares/profile");

//fetch the profile on the basis of jwt token in header
router.get("/user/profile", userByJwt);

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.get("/user/:userId", requireSignin, isAuth, read);

router.put("/user/:userId", requireSignin, isAuth, update);

router.param("userId", userById);

module.exports = router;
