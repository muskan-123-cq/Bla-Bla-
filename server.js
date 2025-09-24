

require('dotenv').config(); 
const express=require('express');
const Razorpay=require('razorpay')
const mainRouter = require('./Routes');
const logger = require('./Middlewares/logger');
const errorHandler = require('./Middlewares/errorHandler');
const connectDB = require('./config/db');
// const roleMiddleware = require('./Middlewares/roleMiddleware');
// const authMiddleware = require('./Middlewares/authMiddleware');
const app = express();
app.use(express.json());

app.use(express.static('public'));
app.use(logger);
app.use(errorHandler);
app.use('/',mainRouter);
connectDB();
app.listen(4000,()=>{
    console.log('sever 4000');
    
})

