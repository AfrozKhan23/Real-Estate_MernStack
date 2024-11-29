import jwt from "jsonwebtoken";

const JWT_SECRET = "process.env.JWT_SECRET";

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(403).send({ error: "Access denied. No token provided." });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

export default authenticateJWT;
