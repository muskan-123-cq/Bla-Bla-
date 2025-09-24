const express=require('express');
const authMiddleware = require('../Middlewares/authMiddleware');
const { getMe, getRides, getMyRides, getBookings, getSeats, bookings } = require('../Controllers/getData');
// const booking = require('../Controllers/booking');
const getRouter=express.Router();
getRouter.get('/me',authMiddleware,getMe);
getRouter.get('/rides',getRides)
getRouter.get('/seats',getSeats);
getRouter.get('/booking/:id',bookings)
getRouter.get('/bookings',authMiddleware,getBookings)
getRouter.get('/myRides',authMiddleware,getMyRides)
// getRouter.get('userDetails',)
module.exports=getRouter;