const express=require('express');
const booking = require('../Controllers/booking');
const bookingRouter=express.Router();
bookingRouter.post('/ride',booking);
module.exports=bookingRouter;