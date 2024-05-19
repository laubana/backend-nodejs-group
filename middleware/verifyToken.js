const jsonwebtoken = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  jsonwebtoken.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (error, result) => {
      if (error) {
        return res.status(403).json({ message: "Forbidden" });
      }
      req.id = result.id;
      req.email = result.email;
      next();
    }
  );
};

module.exports = verifyToken;
