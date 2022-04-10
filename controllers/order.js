const Order = require("../models/order");
const OrderDetail = require("../models/orderDetail");
const axios = require("axios");

//{
//deliveryLocation,
//total,
//payment:{
// type,
//   payload(
//}
//products: [{id:””,quantity:1}]
//}

module.exports = {
  createOrder: async (req, res, next) => {
    console.log(req.body.total);
    try {
      console.log("abc");
      const result = await axios({
        method: "post",
        url: "https://khalti.com/api/v2/payment/verify/",
        data: {
          token: await req.body.payment.payload.token,
          amount: await req.body.payment.payload.amount,
        },
        headers: {
          Authorization: `Key {atus your secret key}`,
          "Content-Type": "application/json",
        },
      });

      if (result.status == 200) {
        const { deliveryLocation, products } = req.body;
        const order = new Order({
          deliveryLocation: req.body.deliveryLocation,
          user: req.user._id,
          total: req.body.total,
        });
        await order.save();

        try {
          for (let i = 0; i < products.length; i++) {
            const newOrder = {
              order: order._id,
              product: products[i].id,
              quantity: products[i].quantity,
            };
            const orderDetail = new OrderDetail(newOrder);
            await orderDetail.save();
          }
        } catch (ex) {
          return res.status(500).send({ status: "error", message: ex.message });
        }
      } else {
        console.log(result.data);
      }
    } catch (ex) {
      console.log(ex);
    }
  },

  fetchAllOrders: async (req, res, next) => {
    const orders = await Order.find();
    return res.status(200).send({
      status: "success",
      data: {
        orders,
      },
    });
  },

  fetchMyOrders: async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id }).populate("items");
    return res.status(200).json({
      status: "success",
      data: {
        orders,
      },
    });
  },
};
