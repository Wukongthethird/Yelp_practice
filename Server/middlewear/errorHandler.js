const errorHandler = (err, req, res, next) => {
  console.error("should fire",err.stack)
  res.status(500).json({err})
}

module.exports = errorHandler;