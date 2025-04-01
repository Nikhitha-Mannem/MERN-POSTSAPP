const Comment=require('../models/Comment');

exports.getComments=async (req,res,next)=>{
    
    const PostId=parseInt(req.params.id);
    const commentsList=await Comment.findAll({where:{
        postId:PostId}});
    console.log("Comments for this Post are..",commentsList);
    res.json(commentsList);


}

exports.addComment=async (req,res,next)=>{
    await Comment.create(req.body);
    res.status(200).json("Comment Added Successfully...");

    


}
