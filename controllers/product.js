const { errorHandler } = require("../helper/errorHandler");
const Product = require("../models/product");

exports.productById = (req, res, next, id) => {
  Product.findById(id)
    .populate("genre")
    .populate("author")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: "Product not found",
        });
      }
      req.product = product;
      next();
    });
};

exports.readProduct = (req, res) => {
  return res.json(req.product);
};

exports.removeProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Product removed successfully",
    });
  });
};

/**
 * Sold or featured
 * by sell = /products?sortBy=sold&order=descending&limit=4(limit can be any, for here it is 4)
 * if it is 4 then we will return only 4 products.
 * if no params are send , then all products are returned
 */

// for all Product
exports.listProducts = (req, res) => {
  let order = req.query.order ? req.query.order : "asc"; //ascending order
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;

  Product.find()
    // .select("-photo") //not selecting photo since it is in binary form and makes slow.
    .populate("genre") //we are refering the category as mongose object id referencing to "Category" model so we populate it.
    .populate("author")
    .sort([[sortBy, order]]) //Arrays of array
    .limit(limit) //limit or it is set by default
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json(products);
    });
};

// for featured Product
exports.listProduct = (req, res) => {
  let order = req.query.order ? req.query.order : "asc"; //ascending order
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 5; //default it's going to be five.

  Product.find()
    // .select("-photo") //not selecting photo since it is in binary form and makes slow.
    .populate("genre") //we are refering the category as mongose object id referencing to "Category" model so we populate it.
    .populate("author")
    .sort([[sortBy, order]]) //Arrays of array
    .limit(limit) //limit or it is set by default
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json(products);
    });
};
