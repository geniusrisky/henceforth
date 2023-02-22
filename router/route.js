import {Router} from 'express';
import {usersController } from '../Controller/userController.js';
import {taskController } from '../Controller/task.js';

const router = Router()

router.get('/', (req, res)=>{
    res.send('welcome');
})


//user APIs

router.post('/user/signUp', usersController.signUp);
router.get('/user/login', usersController.login);


//tasks Api
router.post('/task/create', taskController.createTask);
router.get('/task/getTask', taskController.getTasks);
router.put('/task/update/:id', taskController.updateTask);
router.delete('/task/delete/:id', taskController.deleteTask);



export default router;
