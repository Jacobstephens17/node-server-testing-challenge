const jwt = require("jsonwebtoken")
const { jwtSecret } = require("../../config/secrets.js")

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  if(!token){
    res.status(401).json("Token Is Required!")
  }else{
    jwt.verify(token,jwtSecret, (err,decoded)=>{
      if(err){
        res.status(401).json("Broken Token " + err.message)
      }else{
        req.decodedToken = decoded
        next()
      }
    })
  }
};
