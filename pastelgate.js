const key = process.env.ENCRYPTION_KEY
module.exports.isAuth = (req, res, next) => {
    const auth = req.headers.authorization;
    if (auth === key) {
      next();
    } else {
      res.status(401);
      res.send('Access forbidden');
    }
}