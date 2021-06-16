import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorisation;
  const token = authHeader;
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    // req.user is send in the middlware
    req.user = user;
    next();
  });
};

export default authenticateToken;
