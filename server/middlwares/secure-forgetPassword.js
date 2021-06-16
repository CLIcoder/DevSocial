const authenticateForget = (req, res, next) => {
  const authHeader = req.headers.forget;
  const token = authHeader;
  if (token == null || token !== process.env.FORGET_KEY)
    return res.sendStatus(401);
  next();
};

export default authenticateForget;
