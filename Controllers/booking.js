//bookings.js
const { readUsers, writeUsers } = require('../utils/fileDB');
const uuid=require('uuid');
const Ride=require('../Models/rideModel')
const Bookings=require('../Models/bookingModel');
async function booking(req, res) {
    const { rideId, seatsBooked,Payment } = req.body;
    console.log(req.body);
    
    const customerId = req.user.id;
    const customerName = req.user.Name;

    // readUsers('rides.json', async (err, rides) => {
    //     if (err) return res.status(500).json({ error: `Error reading rides file` });
// console.log(id," ",rideId);

        const rideToBook =  await Ride.findOne({ id : rideId});
    
        rideToBook.Seats -= seatsBooked;
        // rideToBook.updateOne(
        //     {se}
        // )

        // writeUsers('rides.json', rides, (err) => {
        //     if (err) return res.status(500).json({ error: 'Error updating ride seats' });
        // });

        // readUsers('bookings.json', (err, bookings) => {
        //     if (err) return res.status(500).json({ error: 'Error reading bookings file' });
            
            const newBooking = {
                id: uuid.v4(),
                rideId: rideId,
                customerId: customerId,
                customerName: customerName,
                seatsBooked: seatsBooked,
                status: 'confirmed',
                bookingTime: new Date().toISOString(),
                Payment:Payment
            };
            
           await Bookings.create(newBooking);

            // writeUsers('bookings.json', bookings, (err) => {
            //     if (err) return res.status(500).json({ error: 'Error saving booking' });
                
            //    
            // });
        // });
    // });
    await rideToBook.save();
     res.status(200).json({ msg: 'Booking successful', booking: newBooking });
}

module.exports = booking;