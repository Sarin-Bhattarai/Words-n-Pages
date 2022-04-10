const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },
    deliveryLocation: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "accepted", "rejected", "delivered"],
      default: "pending",
    },
    total: {
      type: Number,
      required: true,
    },
    deliveryCharge: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
