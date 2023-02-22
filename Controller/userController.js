import CrudOperations from "../utils/db/mongo.crud.js";
import {Users}from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import JwtGenerator from "../utils/db/jwt/jwtGenerator.js";


class UsersController{

    async signUp(req,res){
        const usersData = req.body;
        if(usersData.email){
            
            const users = await new  CrudOperations(Users).getDocument({"email":usersData.email});
            if(users){
                return res.status(400).json({
                    "msg":"Users already exists please login"
                })
            }
            const hash = await bcrypt.hash(usersData.password, 10)
            usersData.password = hash
            const newUsers = new Users(usersData);
             try{
                const result = await new CrudOperations(Users).save(newUsers)
                const user=result.toObject();
                delete user.password;
                delete user.__v;

                 res.status(201).json(
                    user
                 )
                }
            catch(error){
                res.status(201).json(
                     {
                         "msg":error.message
                     }
                 )
            }
         }
          else{
            res.status(400).json({
                "msg":"please provide email"
             })
            }
      }

      async login(req,res){
        const usersData = req.body;
        if(usersData.email){
            const user = await new CrudOperations(Users).getDocument({"email":usersData.email,"isDeleted":false});
            if(user){
                const isMatch = await bcrypt.compare(usersData.password, user.password);
                if(isMatch){
                    let token
                    const jwtGenerator = new JwtGenerator("security");
                    if(user.role === UserRole.employee){
                     token = jwtGenerator.generateJwtUser (user._id,user.name,user.role)
                     res.status(200).json({           
                        "msg":"employee login successful ",           
                        "token":token           
                    })     
                    }else{
                            token = jwtGenerator.generateJwtUser(user._id,user.name,user.role)
                            res.status(200).json({           
                               "msg":"mentor login successful ",           
                               "token":token           
                           })     
                         }   }        
                else{           
                    res.status(400).json({           
                        "msg":"invalid credentials"})
                    }
                }
                else{
                    res.status(400).json({           
                        "msg":"enter valid email address"
                })
    
                 }
                }	
                else{
                    res.status(400).json({           
                     "msg":"please provide email"           
                    })           
            }
        }
    
  
}
export const usersController = new UsersController();