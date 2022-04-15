const express = require("express");
const router = express.Router();

//import auth controller
const { VerifyLogin } = require("../middlewares/profile");
const {
  createOrder,
  fetchAllOrders,
  fetchMyOrders,
  createCashOrder,
} = require("../controllers/order");

router.get("/orders", fetchAllOrders);
router.get("/my-orders", fetchMyOrders);
router.post("/orders", VerifyLogin, createOrder);
router.post("/cash/orders", VerifyLogin, createCashOrder);

module.exports = router;
