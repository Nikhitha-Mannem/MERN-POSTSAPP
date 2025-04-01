const express=require('express');
const router=express.Router();
const authController=require('../controllers/authController');
const ValidateUser = require('../middlewares/authMiddleware');

router.post('/register',authController.addUser);

router.post('/login',authController.loginUser);

router.get('/userdetails',ValidateUser,authController.getUserDetails);

module.exports=router;