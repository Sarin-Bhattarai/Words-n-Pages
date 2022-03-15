const express = require("express");
const router = express.Router();

//importing middlewares
const { VerifyLogin } = require("../middlewares/profile");
const { getUserauthorization } = require("../middlewares/authorization");

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

router.post("/genre/create", VerifyLogin, getUserauthorization, create);

router.put(
  "/genre/:genreId/:userId",
  VerifyLogin,
  getUserauthorization,
  update
);

router.delete(
  "/genre/:genreId/:userId",
  VerifyLogin,
  getUserauthorization,
  remove
);

router.get("/genres", list);

router.param("genreId", genreById);
//params property is where Express stores the values of the named sections in the URL.

router.param("userId", userById);

module.exports = router;
