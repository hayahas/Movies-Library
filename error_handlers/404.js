module.exports= (req,res,next)=>{
    res.status(404).send({
        code: 404,
     message : "page not found",
     method: req.method,
     end_point : req.url
        })
    }