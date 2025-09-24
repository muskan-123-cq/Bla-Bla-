const { readUsers } = require("../utils/filedb");
const Ride=require('../Models/rideModel');
const Bookings=require('../Models/bookingModel');
function getMe(req, res) {
    res.status(200).json({
        msg: "Welcome back",
        user: req.user
    });
}
async function getRides(req,res){
    // readUsers('rides.json',async (err,users)=>{
    //     if(err) return res.status(400),json({msg:'error'});
    //     else{
    //         return res.json(users);
    //     }
    // })
const rides=await Ride.find();
return res.json(rides);
}
async function getMyRides(req,res) {
    const userId=req.user.id;
    // readUsers('rides.json', (err, rides) => {
    //     if (err) {
    //         return res.status(500).json({ error: "Error reading rides data." });
    //     }
        const myRides = await Ride.find({driverId : userId});
        if (myRides.length === 0) {
            return res.status(200).json({ msg: "You have not posted any rides yet.", rides: [] });
        }
        res.status(200).json({ rides: myRides });
        // });
}
async function getBookings(req,res){
const userId=req.user.id;
console.log(userId);

// readUsers('bookings.json',(err,bookings)=>{
//      if (err) {
//             return res.status(500).json({ error: 'Error reading bookings' });
//         }
        const myBookings = await Bookings.find({ customerId : userId}).lean();
        console.log(myBookings);
        
        // readUsers('rides.json', (err, rides) => {
        //     if (err) {
        //         return res.status(500).json({ error: 'Error reading rides ' });
        //     }
        const bookingsWithDetails = await Promise.all(myBookings.map( async booking => {
                // console.log("Booking rideId:", booking.rideId);
                const rideDetails = await Ride.findOne({id : booking.rideId});
                // console.log("Sample ride:", rideDetails);
                return {
                    ...booking, // Booking ki sari details
                    rideDetails: rideDetails||{} // Ride ki details jodein
                };
            })
        );
            res.status(200).json(bookingsWithDetails);
// })
// })
}
async function bookings(req,res){
    const rideId=req.params.id;
    
const data=await Bookings.find({rideId:rideId});
return res.json(data);
}
async function getSeats(req,res){
  const seats= await Ride.find();
//   console.log(seats.Seats);
  return res.json({msg:'seats itni h'});

}
module.exports = { getMe ,getRides,getMyRides,getBookings ,getSeats,bookings};