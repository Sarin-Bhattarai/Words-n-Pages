const User = require("../models/user");
const jwt = require("jsonwebtoken");
exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not Found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.update = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to perform this action",
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user);
    }
  );
};

// exports.getProfile = (req, res) => {
//   jwt.verify(req.token, (err, authorizedData) => {
//     if (err) {
//       res.sendStatus(403).json({
//         status: "fail",
//         message: "Forbidden",
//       });
//     } else {
//       res.json({
//         message: "Successful log in",
//         authorizedData,
//       });
//     }
//   });

//   console.log("SUCCESS: User Profile");
// };
