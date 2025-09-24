//postData.js
const bcrypt = require('bcrypt');
const uuid = require('uuid')
const jwt = require('jsonwebtoken');
const Razorpay = require('razorpay');
const User = require('../Models/userModel');
const Ride = require('../Models/rideModel');
const Bookings = require('../Models/bookingModel')
const { readUsers, writeUsers } = require('../utils/filedb');


async function sign(req, res) {

    const { Name, Email, Pass, role } = req.body;
    const hashPass = await bcrypt.hash(Pass, 10);
    // console.log(role);
    // readUsers('users.json', (err, users) => {
    //     if (err) return res.status(500).json({ error: "read krne m error" });

    const existUser = await User.findOne({ Email: Email });
    if (existUser) return res.status(400).json({ msg: 'already h user' });
    const newUser = { id: uuid.v4(), Name, Email, Pass: hashPass, role };
    await User.create(newUser);
    res.status(200).json({ msg: 'User added successfully' });
    // writeUsers('users.json', users, (err) => {
    //     if (err) return res.status(500).json({ error: 'write me error aya h' });
    //     else res.status(200).json({ msg: 'hogya h user add' });
    // })
    // })
}
async function login(req, res) {
    const { Email, Pass } = req.body;

    const existUser = await User.findOne({ Email: Email });
    if (!existUser) return res.status(400).json({ error: 'user signuo hi n h' });
    const match = await bcrypt.compare(Pass, existUser.Pass);

    if (!match) {
        return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: existUser.id, Email: existUser.Email, Name: existUser.Name, role: existUser.role }, process.env.jwt_secretkey, { expiresIn: '1d' });

    res.status(200).json({ msg: "Login success", existUser, token });
}
async function ride(req, res) {
    const userId = req.user.id;
    const driverName = req.user.Name;
    const { Destination, Datetime_local, Departure, Seats, Price, Submit } = req.body;
    if (!Destination || !Departure || !Datetime_local || !Seats || !Price) {
        return res.status(400).json({ error: "All ride details are required." });
    }


    // readUsers('rides.json', async (err, users) => {
    // if (err) return res.status(500).json({ error: "read krne m error" });
    const newRide = { id: uuid.v4(), driverId: userId, driverName, Destination, Datetime_local, Departure, Seats, Price, Submit };
    await Ride.create(newRide);
    return res.json({ msg: 'ride created' })
    // writeUsers('rides.json', users, (err) => {
    //     if (err) return res.status(500).json({ error: 'write me error aya h' });
    //     else res.status(200).json({ msg: 'hogya h user add' });
    // })
    // })
    // await Ride.save();
}
async function deleteRide(req, res) {
    const rideId = req.params.id;
    const userId = req.user.id;
    console.log("ride id", rideId);
    console.log('user id', userId);

    const rideToDelete = await Ride.findOne({ id: rideId });

    if (!rideToDelete) {
        return res.status(404).json({ msg: 'Ride not found.' });
    }

    if (rideToDelete.driverId !== userId) {
        return res.status(403).json({ msg: 'You are not authorized to delete this ride.' });
    }
    const deletedRideResult = await Ride.findOneAndDelete({ id: rideId });
    const deletedBookingsResult = await Bookings.deleteMany({ rideId: rideId });
    res.json({ msg: "Ride deleted successfully" });
}
// async function createOrder(req, res) {
//     const { amount } = req.body;
//     try {
//         const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
// });
        // const options = {
        //     amount: Number(amount) * 100,
        //     currency: "INR",
        //     receipt: "receipt_order_" + Date.now(),
        // };
//         const order = await razorpay.orders.create(options);
//         console.log(order);
        
//         res.json({
//             id: order.id,
//             amount: order.amount,
//             currency: order.currency,
//         });
//     }
//     catch (err) {
//         console.error("Razorpay error:", err);
//         return res.status(500).json({ error: "Failed to create Razorpay order" });
//     }
// }
module.exports = { sign, login, ride, deleteRide, };