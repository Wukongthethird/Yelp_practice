const db = require("../../DB");

const logout = async (req,res)=>{
  const sid = req.sessionID;

  await req.session.destroy((err) => {
    if (err) {
      return res.json({ err });
    } else {
      req.sessionID = null;
      req.logout((err) => {
        if (err) {
          // something is wrong here when i do the return has to be console.log?
          console.log(err)
          // return res.json({ err });
        }
      });
      return res
        .clearCookie("connect.sid", {
          path: "/",
          httpOnly: true,
          credentials: true,
        })
        .json({ msg: "you have logout successfully" });
    }
  });
}



module.exports = logout