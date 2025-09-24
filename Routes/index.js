const express=require('express');
const postRouter = require('./postData');
const getRouter = require('./getData');
const homeRouter = require('./homeRoutes');
// const updateRouter=require('./updateRouter')
const bookingRouter = require('./bookingRouter');
const authMiddleware = require('../Middlewares/authMiddleware');
const bookingMiddleware = require('../Middlewares/validationMiddleware');
const booking = require('../Controllers/booking');
const updateRouter = require('./updateRouter');
const mainRouter=express.Router();
mainRouter.use('/post',postRouter);
mainRouter.use('/get',getRouter);
mainRouter.use('/booking', authMiddleware,bookingMiddleware,bookingRouter);
mainRouter.use('/update',updateRouter);
mainRouter.use('/',homeRouter)

module.exports=mainRouter;