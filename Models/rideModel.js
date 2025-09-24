const mongoose=require('mongoose');
const ride=mongoose.Schema({
    id:{
        type: String, 
        required: true
    },
    driverId: {
        type: String, 
        required: true
    },
    driverName: {
        type: String,
        required: true
    }, 
    Departure: {
        type: String, 
        required: true
    },
    Destination: {
        type: String,
        required: true
    },
    Datetime_local: {
        type: Date,
        required: true,
        default: Date.now
    },
    
    Seats: {
        type: Number,
        required: true,
    },
    Price:{
        type:Number,
        required:true
    },
  
})
module.exports=mongoose.model('ride',ride);