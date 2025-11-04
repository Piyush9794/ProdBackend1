const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization; // token header me aayega

  if (!token) {
    return res.json({
      success: false,
      code: 401,
      message: "Token missing",
    });
  }

  try {
    const decoded = jwt.verify(token, "Piyush@123"); // token verify
    req.user = decoded;
    next();
  } catch (err) {
    return res.json({
      success: false,
      code: 401,
      message: "Invalid or expired token",
    });
  }
};

module.exports = verifyToken;
