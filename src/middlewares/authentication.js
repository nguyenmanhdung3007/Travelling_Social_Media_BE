const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"] || req.headers.authorization;
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(200).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;