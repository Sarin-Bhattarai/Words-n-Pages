const express = require("express");
const router = express.Router();
//import controllers
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const {
  createAuthor,
  authorById,
  readAuthor,
  updateAuthor,
  removeAuthor,
  listAuthor,
} = require("../controllers/author");
const { userById } = require("../controllers/user");

router.get("/author/:authorId", readAuthor);

router.post(
  "/author/create/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  createAuthor
);

router.put(
  "/author/:authorId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  updateAuthor
);

router.delete(
  "/author/:authorId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  removeAuthor
);

router.get("/authors", listAuthor);

router.param("authorId", authorById);
//params property is where Express stores the values of the named sections in the URL.

router.param("userId", userById);

module.exports = router;
