const corsConfig = {
  // allowedHeaders: "X-Requested-With, Content-Type, Accept",
  //   credentials: true,
  //   httpOnly: true,
  // sameSite: "lax",
  // secure:false,
  //
  // origin: "*",
  /**  this makes cookie save in browser */
  credentials: true,
  origin: "http://localhost:5173",
};

module.exports = corsConfig;
