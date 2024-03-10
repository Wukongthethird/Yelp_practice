// handles authorization for logged in users

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    
    res.json({ msg: "you need to be login to do that" });
  }
}

module.exports = isAuth