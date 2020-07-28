const ErrorResponse = require('../utils/errorResponse');
const errorHendler = (err,req,res,next)=>{
  

    let error = {...err};
    error.message = err.message;

  //  console.log(err);

   if(err.name == 'validationError'){

        const messages = Object.values(err.errors).map(val=>val.message);
        error = new ErrorResponse(messages,400);
    }

    res.status(err.statusCode || 500).json(
        {
            success: false,
            error : err.message || 'server error'
        }
     );
};
module.exports = errorHendler;