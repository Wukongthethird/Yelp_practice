const db = require("../../DB");

const fetchUser = async (req, res) => {
  const result = await db.query(`select * from user_sessions where sid = $1`, [
    req.sessionID,
  ]);

  if (result.rows.length === 0) {
    return res.json({ user: {}, status: "logout" });
  }

  const user = result.rows[0].sess.passport.user;
  if (JSON.stringify(req.session.passport.user) === JSON.stringify(user)) {
    return res.json({ user, status: "login", token: req.sessionID });
  }

  return res.json({ user: {}, status: "logout" });
};

module.exports = fetchUser;
