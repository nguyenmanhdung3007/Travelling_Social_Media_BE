const bcrypt = require( "bcryptjs");
const jwt = require("jsonwebtoken");

exports.hashString = async (useValue) => {
  const salt = await bcrypt.genSalt(10);

  const hashedpassword = await bcrypt.hash(useValue, salt);
  return hashedpassword;
};

exports.compareString = async (userPassword, password) => {
  const isMatch = await bcrypt.compare(userPassword, password);
  return isMatch;
};

exports.createJwtToken = (userID) => {
  return jwt.sign({ userID }, "khanhlinh2000", {
    expiresIn: "1d",
  });
};
