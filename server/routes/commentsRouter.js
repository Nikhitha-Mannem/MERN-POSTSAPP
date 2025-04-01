const express=require('express');
const router=express.Router();

const commentsController=require('../controllers/commentsController');
const ValidateUser=require('../middlewares/authMiddleware');

router.get('/post/:id',commentsController.getComments);



router.post('/',ValidateUser,commentsController.addComment);

module.exports=router;