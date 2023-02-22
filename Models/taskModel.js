import mongoose from 'mongoose'
const TaskSchema =  new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref:'User',
    },
   
    name:{
        type:String,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    time:{
        type:Date,
    },
    isCompleted: {
        type: Boolean,
        default: false,
        required: true
    }
},{timestamps: true})

const Task = new mongoose.model('Task', TaskSchema)
export {Task}