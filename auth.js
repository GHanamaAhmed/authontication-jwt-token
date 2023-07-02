const jwt = require("jsonwebtoken");
const jwtverify = (req, res, next) => {
  const token = req.cookies?.jwt;
  if (!token) return res.render("index");
  jwt.verify(token, "ahmed", (err, decode) => {
    if (err) return res.render("index");
    if (!decode) {
      return res.status(401).render("index");
    }
    res.user = decode.email;
    next();
  });
};
module.exports = { jwtverify };
