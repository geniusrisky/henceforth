import jwtVerify from './jwtVerify.js'

const jwtVerify = new JwtVerify('security')

export const verifyTokenUser = ( req, res, next)=>{

    if(!req.headers.authorization){
        res.status(401).json('no User Logged-In')
    }else {
        try{
            jwtVerify.verifyTokenUser(req.headers.authorization, (err, payload)=>{
                if(payload){
                    req.currentuser =payload;
                    next();
                }else {
                    res.status(401).json('not Authorized');
                }
            })
        }catch(err){
       res.status(401).json("not Authorized")
        }
    }


}