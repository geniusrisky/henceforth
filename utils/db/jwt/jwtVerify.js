import jwt from "jsonwebtoken";

class JwtVerify{
   jwtKey;
   constructor(jwtKey){
    this.jwtKey = jwtKey;
   }

   decodeJwt(token){
    try{
        const payload = jwt.decode(token);
        return payload;
    }catch(err){
        console.log(err)
        console.error(err)
        throw new Error('error decoding the payload')
    }
   }


   verifyJwtUser(token, next){
    const payload = this.decodeJwt(token);
    const verifyOptions ={
        issuer: 'AKASH-User',
        Subject:payload.sub,
        audience: payload.aud,
        algoriths: ['HS256'],
    }
   
  jwt.verify(token, this.jwtKey, verifyoptions, (err, decodeJwt)=>{
    if(err){
next(err)
    }
    else {
        next(null, decodeJwt)
    }
  })
}
}

export default JwtVerify