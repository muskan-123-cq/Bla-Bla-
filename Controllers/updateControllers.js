const Ride=require('../Models/rideModel')
const Booking=require('../Models/bookingModel')
async function updateRide(req,res){
const {id,from,to,seats}=req.body;
console.log("Request body:", req.body);
const ride = await Ride.findOne({ id: id });
 console.log("Matched Ride:", ride);
const updatedRide= await Ride.findOneAndUpdate(
    {id:id},
    {$set:{Destination:to,Departure:from,Seats:seats} },
    {new:true}
)
// console.log(updatedRide);

  if (!updatedRide) {
      return res.status(404).json({ message: "Ride not found" });
    }
     res.json({ message: "Ride updated successfully", updatedRide });
}
async function deleteBooking(req,res){
const bookingId=req.params.id;
const userId=req.user.id;
const bookingToCancel=await Booking.findOne({id:bookingId});
if(!bookingToCancel){
  return res.json({msg:'ride nahi hai '});
}
if (bookingToCancel.customerId !== userId) {
            return res.status(403).json({ msg: 'You are not authorized to cancel this booking.' });
        }
const dltBooking=await Booking.findOneAndDelete({id:bookingId});
if (!dltBooking) {
            return res.status(500).json({ msg: 'Failed to delete the booking.' });
        }
        const ride = await Ride.findOne({ id: dltBooking.rideId });
        if (ride) {
            ride.Seats += dltBooking.seatsBooked; 
            await ride.save(); 
        }

        return res.status(200).json({ msg: 'Booking canceled successfully. Seats have been made available.' });
}
async function markBookingAsPaid(req, res) {
    try {
        const { bookingId } = req.params;
        const driverId = req.user.id; 

        const booking = await Booking.findOne({ id: bookingId });
        if (!booking) {
            return res.status(404).json({ msg: 'Booking not found.' });
        }

        
        const ride = await Ride.findOne({ id: booking.rideId });
        if (!ride || ride.driverId !== driverId) {
            return res.status(403).json({ msg: 'You are not authorized to perform this action.' });
        }

      
        if (booking.status === 'Cash Pending') {
            booking.status = 'Paid';
            await booking.save();
            return res.status(200).json({ msg: 'Booking marked as paid successfully.' });
        } else {
            return res.status(400).json({ msg: 'Invalid booking status for this action.' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error occurred.' });
    }
}
module.exports={updateRide,deleteBooking,markBookingAsPaid};