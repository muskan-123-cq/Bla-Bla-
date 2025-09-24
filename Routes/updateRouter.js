const express=require('express');
const {updateRide, deleteBooking, markBookingAsPaid} = require('../Controllers/updateControllers');
const authMiddleware = require('../Middlewares/authMiddleware');
const updateRouter=express.Router();
updateRouter.put('/ride/:id',updateRide)
updateRouter.put('booking/paid/:id',authMiddleware,markBookingAsPaid)
updateRouter.delete('/dltBooking/:id',authMiddleware,deleteBooking);
module.exports=updateRouter