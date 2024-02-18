const jwt = require('jsonwebtoken');

const generateToken = (id,name,email)=>{
    return jwt.sign({id,name,email},process.env.JWT_SECRET,{
        expiresIn:"2d"
    })
}

module.exports = generateToken;
