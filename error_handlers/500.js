module.exports=(err, req, res, next) => {
    res.status(500).send({
      code: 500,
      message: "Server Error",
      Error: err,
     method: req.method,
     end_point : req.url
    })}
   