const express = require("express");
const router = express.Router();
//import controllers
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const {
  create,
  genreById,
  read,
  update,
  remove,
  list,
} = require("../controllers/genre");
const { userById } = require("../controllers/user");

router.get("/genre/:genreId", read);

router.post("/genre/create/:userId", requireSignin, isAuth, isAdmin, create);

router.put("/genre/:genreId/:userId", requireSignin, isAuth, isAdmin, update);

router.delete(
  "/genre/:genreId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);

router.get("/genres", list);

router.param("genreId", genreById);
//params property is where Express stores the values of the named sections in the URL.

router.param("userId", userById);

module.exports = router;
