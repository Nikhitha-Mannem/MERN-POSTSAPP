const express=require('express');
const Post=require('../models/Post');
const Like=require('../models/Like');
exports.getPosts=async (req,res,next)=>{
    
    const postsList=await Post.findAll()
    
    const userLikedPosts=await Like.findAll({where:{userId:req.user.id},attributes:['id']})
    res.json({postsList:postsList,userLikedPosts:userLikedPosts});

}

exports.createPost=async (req,res,next)=>{
    
    await Post.create(req.body);
    res.status(200).send("Post Added Successfully....");
}

exports.getPost=async (req,res,next)=>{
    
    const id=req.params.id;
    console.log('controller',id);
    
    const post=await Post.findByPk(id);
    console.log('post info in conroller',post);
    
    res.json(post);
}

exports.handleLikes=async (req,res,next)=>{
    const postId=req.body.postId;
    const userId=req.user.id;
    const likedId=await Like.findOne({where:{postId:postId,userId:userId},attributes:['id']});
    if(!(likedId)){
        await Like.create({postId:postId,userId:userId});
        await Post.increment('likesCount',{
            by:1,
            where:{id:postId}
        })
        

    }
    else{
        await Like.destroy({where:{id:likedId.id}})
        await Post.decrement('likesCount',{
            by:1,
            where:{id:postId}
        })
    }
    const postsList=await Post.findAll()
    const userLikedPosts=await Like.findAll({where:{userId:req.user.id},attributes:['postId']});
    res.json({postsList:postsList,userLikedPosts:userLikedPosts});
}

exports.deletePost=async (req,res,next)=>{
    const postId=req.params.postId;
    await Post.destroy({where:{id:postId}});
    res.json("Post Deleted Successfully..");
}
exports.editPost=async (req,res,next)=>{
    console.log("edit controller");
    const updatedPost=req.body;
    const postId=req.params.postId;
    await Post.update(updatedPost,{where:{id:postId}})
    res.json("Post Edit Successfull..")
}