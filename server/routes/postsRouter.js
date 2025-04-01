const express=require('express');
const router=express.Router();

const postsController=require('../controllers/postsController');
const ValidateUser=require('../middlewares/authMiddleware');

router.get('/',ValidateUser,postsController.getPosts);
router.get('/byId/:id',postsController.getPost);
router.post('/',ValidateUser,postsController.createPost);
router.delete('/deletepost/:postId',ValidateUser,postsController.deletePost);
router.post('/like',ValidateUser,postsController.handleLikes);
router.put('/:postId',ValidateUser,postsController.editPost);

module.exports=router

