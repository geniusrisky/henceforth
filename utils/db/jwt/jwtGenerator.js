import jwt from "jsonwebtoken";
import { token } from "morgan";

class JwtGenerator{
    jwtKey;

    constructor(jwtKey){
        this.jwtKey= jwtKey;
    }

    generateJwtUser(userId, username){
        const payload = {
            id : userId,
            username: username
        }
        const signoptions ={
        issuer: 'AKASH-User',
        subject: userId.toString(),
        algorithm : 'HS256'
        }
    
      const token = jwt.sign(
        payload,
        this.jwtKey,
        signoptions
      )

      return token
    }
    

   
}

export default JwtGenerator