const mongoose=require('mongoose');
const booking=mongoose.Schema({
    id:{
        type: String, 
        required: true
    },
    rideId: {
        type: String, 
        required: true
    },
    customerId: {
        type: String, 
        required: true
    },
    customerName: {
        type: String,
        required: true
    }, 
    seatsBooked: {
        type: Number,
        required: true
    },
    
    status: {
        type: String,
        required: true,
        default: 'confirmed',
        enum: ['confirmed', 'canceled'] 
    },
    
   
    bookingTime: {
        type: Date,
        required: true,
        default: Date.now
    },
     Payment:{
    type:String,
    default:'cash',
    enum:['Pending','paid','failed','cash','online']
   }
})
module.exports=mongoose.model('Booking',booking);