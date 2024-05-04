// handles authorization for logged in users
const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.json({ err: "you need to be login to do that" });
  }
}

module.exports = isAuth