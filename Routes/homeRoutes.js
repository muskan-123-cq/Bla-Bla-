const express=require('express');
const welcome = require('../Controllers/homeRoutes');
const homeRouter=express.Router();
homeRouter.get('/',welcome);
module.exports=homeRouter;