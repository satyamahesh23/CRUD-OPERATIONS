const jwt = require('jsonwebtoken');
const protect=(req,res,next)=>{
    try {
        const token=req.cookies.token
        if(!token){
             return res.status(401).json({ success: false, message: 'Not authorized, no token' });
        }
        const decoded=jwt.verify(token, process.env.JWT_SECRET)
        req.userId=decoded.id
        console.log(req.userId)
        next()
    } catch (error) {
         res.status(401).json({ success: false, message: 'Not authorized, token invalid' });
    }
}
module.exports = protect