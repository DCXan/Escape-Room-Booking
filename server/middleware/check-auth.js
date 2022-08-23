const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log(req.body.isAdmin);
  if (req.body.isAdmin == true) {
    // const token = req.headers.authorization.split(" ")[1];
    // const decoded = jwt.verify(token, process.env.JWT_KEY);
    // req.userData = decoded;
    next();
  } else {
    res.status(401).json({
      success: false,
      message: "Not authorized as an admin",
    });
  }
};
