
import mongoose from 'mongoose'
const userSchema = new mongoose.Schema(
    {
      name:{
        type:String,
        required: true,
        
      },
      email:{

        type: String, },
      password:{
        type:String,
        required: true
      },
      isDeleted:{
        type:Boolean
      }

    },{ timestamps: true}
)

const Users = mongoose.model('User', userSchema)
export {Users}
