const key = process.env.ENCRYPTION_KEY
const auth = require('basic-auth')


module.exports.isAuth = (req, res, next) => {
    const user = auth(req)
    if (user === undefined || user['name'] !== 'pastelgate' || user['pass'] !== key) {
      res.status(401);
      res.setHeader('WWW-Authenticate', 'Basic realm="Node"');
      res.send('Access forbidden');
    } else {
      next();
    }
}