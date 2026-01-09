const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const userAuth = async(req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(401).json({error: "Not authorized"});
  }

  const accessToken = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    req.user = decoded;
    next();
    
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "ACCESS_TOKEN_EXPIRED",
      });
    }

    return res.status(401).json({error: "Invalid or expired token"});
  }
}

module.exports = userAuth
