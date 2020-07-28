const UserModel = require('../model/User');
const ErrorResponse = require('../utils/errorResponse');
//@desc Register User
//route GET /api/v1/auth/register
//access Public
exports.register = async (req,res,next)=>{

    try {
        console.log(req.body);
        const {user_name,email,password,re_password} = req.body;

        if(password === re_password){

            const user = await UserModel.create({
                user_name,
                email,
                password
            });
//tvsc chat application 
            // create token
            const token =  user.getSignedJwtToken();
             
            res.status(201).json({
                sucess : true,
                data:user,
                token : token
            });

        }else{
            next(new ErrorResponse('Passwod do not match',500));
        }

 
    } catch (error) {

        next(error);
        
    }

};
//@desc Login User
//route GET /api/v1/auth/login
//access Public
exports.login = async (req,res,next)=>{

    const {user_name,password}= req.body;

    if(!user_name || !password){
        return next(new ErrorResponse('plese provide user name and password',400));
    }

    const user = await UserModel.findOne({user_name}).select('+password');

    if(!user){
        return next(new ErrorResponse('Invalid credentials',401));
    }

    const isMatch = await user.matchPassword(password);

    if(!isMatch){
        return next(new ErrorResponse('Invalid credentials',401));
    }

    const token =  user.getSignedJwtToken();

    res.status(200).json({
        status: true,
        token : token
    });



};