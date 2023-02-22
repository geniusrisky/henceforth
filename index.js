import express from 'express';
import router from './router/route.js';
import mongoose from 'mongoose'


let app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
let port = 3000
const url = "mongodb://127.0.0.1/taskDb";

mongoose.connect(url, {useNewUrlParser: true}).then(()=>{
    console.log('mongDb is connected');
}).catch((err)=>{
    console.log(err)
});

app.use('/', router);

app.listen(process.env.port || port , ()=>{
    console.log(`app is running at port: ${port} `)
})

