import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config/keys.js";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorisation;
  const token = authHeader;
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, JWT_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    // req.user is send in the middlware
    req.user = user;
    next();
  });
};

export default authenticateToken;
