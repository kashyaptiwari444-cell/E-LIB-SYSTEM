const jwt = require("jsonwebtoken");
const crypto = require("crypto")
const User = require("../models/User");


const auth = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Anauthorised, pls Login !!"
        });
    }

    const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

    try {

        const verify = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = verify;

        next();

    } catch (err) {

        return res.status(401).json({
            message: "Invalid Token"
        });

    }
};


exports.forgetPassword = async(req,res)=>{
    try{
        const { email } = req.body;

        //check user
        const user = await User.findOne({ email });

        if(!user){
            return res.status(404).json({
                message:"User Not Found!"
            });
        }
        
        //generate token
        const token = crypto.randomBytes(32).toString("hex");


        //save token in database
        user.resetPasswordToken = token;
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

        await user.save();

        //send email
        res.status(200).json({
            message: "Reset link sent",
            token
        })
    }
    catch(err){
        res.status(500).json({ message: err.message});
    }
};


module.exports = auth;