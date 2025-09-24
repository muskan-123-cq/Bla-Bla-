// const { readUsers, writeUsers } = require('../utils/fileDB');
const Ride=require('../Models/rideModel')
async function bookingMiddleware(req,res,next){
    const { rideId, seatsBooked } = req.body;
    const customerId = req.user.id;
    // console.log(customerId);
    
    // readUsers('rides.json', (err, rides) => {
        // if (err) {
        //     return res.status(500).json({ error: 'Error reading rides file' });
        // }
        // const rideToBook = rides.find(ride => ride.id === rideId);
        const rideToBook=await Ride.findOne({id:rideId})
        if(rideToBook.Seats==0){
           return res.status(400).json({ error: 'Not enough seats available.' }); 
        }
         if (!rideToBook) {
            return res.status(404).json({ error: 'Ride not found.' });
        }
        if (rideToBook.driverId === customerId) {
            return res.status(400).json({ error: 'Cannot book your own ride.' });
        }
        if (rideToBook.Seats < seatsBooked) {
            return res.status(400).json({ error: 'Not enough seats available.' });
        }
        //  req.rideToBook = rideToBook;
         next();
    // });

}
module.exports=bookingMiddleware;