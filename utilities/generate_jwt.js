const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
module.exports = async(payload)=>{
const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1m"});
return token;
}