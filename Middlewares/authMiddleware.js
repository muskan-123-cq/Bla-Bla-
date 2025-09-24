const jwt=require('jsonwebtoken');
function authMiddleware(req,res,next){
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ error: "No token, access denied" });
    }
    jwt.verify(token,process.env.jwt_secretkey,(err,user)=>{
        if (err) {
            return res.status(403).json({ error: "Invalid token" });
        }
        if (!user.role) {
            return res.status(403).json({ error: "Token is missing role information" });
        }
        req.user = user;
        
        next();
    })
}
module.exports=authMiddleware;