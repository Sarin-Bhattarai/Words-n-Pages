const express = require("express");
const router = express.Router();

//import auth controller
const { VerifyLogin } = require("../middlewares/profile");
const {
  createOrder,
  fetchAllOrders,
  fetchMyOrders,
} = require("../controllers/order");

router.get("/orders", fetchAllOrders);
router.get("/my-orders", fetchMyOrders);
router.post("/orders", VerifyLogin, createOrder);

module.exports = router;
