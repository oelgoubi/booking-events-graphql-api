const jwt = require('jsonwebtoken');




module.exports = async (ctx, next)=>{
    const authHeader = ctx.request.get("Authorization");

    if(!authHeader){
        ctx.isAuth = false;
        return next();
    }

    const token = authHeader.split(' ')[1];// Auth : Bearer tokenSrting

    if(!token || token === ""){
        ctx.isAuth = false;
        return next();
    }
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.TokenKey || "TokenKey")   
    } catch (error) {
        ctx.isAuth = false;
        return next();
    }

    if(!decoded)
    {
        ctx.isAuth = false;
        return next();
    }
    console.log("success")

    // Auth Valid
    ctx.isAuth = true;
    ctx.userId = decoded.userId
    return next();

}