const express = require("express");
const router = express.Router();
//import middlewares
const { VerifyLogin } = require("../middlewares/profile");
const { getUserauthorization } = require("../middlewares/authorization");

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

router.post("/author/create", VerifyLogin, getUserauthorization, createAuthor);

router.put(
  "/author/:authorId",
  VerifyLogin,
  getUserauthorization,
  updateAuthor
);

router.delete(
  "/author/:authorId",
  VerifyLogin,
  getUserauthorization,
  removeAuthor
);

router.get("/authors", listAuthor);

router.param("authorId", authorById);
//params property is where Express stores the values of the named sections in the URL.

router.param("userId", userById);

module.exports = router;
