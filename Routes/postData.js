const express=require('express');
const { sign, login, ride, deleteRide, createOrder } = require('../Controllers/postData');
const authMiddleware = require('../Middlewares/authMiddleware');
const roleMiddleware = require('../Middlewares/roleMiddleware');
// const validationMiddleware=require('../Middlewares/validationMiddleware')
const postRouter=express.Router();
postRouter.post('/sign',sign);
postRouter.post('/login',login);
postRouter.post('/ride',authMiddleware,roleMiddleware('driver'),ride);
postRouter.delete('/ride/:id',authMiddleware,deleteRide);
// postRouter.post('/create-order',authMiddleware,createOrder)
module.exports=postRouter;