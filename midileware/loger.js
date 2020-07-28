const loger = (req,res,next)=>{

    res.status(404).json({
        error : "bad Url"
    });
}

module.exports = loger;