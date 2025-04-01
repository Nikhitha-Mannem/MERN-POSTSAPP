const Comment=require('./Comment');
const Post=require('./Post');
const Like=require('./Like');
const User=require('./User');

const defineAssociations=()=>{
    Post.hasMany(Comment,{
        onDelete:'CASCADE',
        foreignKey:'postId'
    });

    Comment.belongsTo(Post,{
        foreignKey:'postId'
    })

    Post.hasMany(Like,{
        onDelete:'CASCADE',
        foreignKey:'postId'
    })

    Like.belongsTo(Post,{
        foreignKey:"postId"
    })

    User.hasMany(Like,{
        onDelete:'CASCADE',
        foreignKey:"userId"
    })

    Like.belongsTo(User,{
        foreignKey:"userId"
    })
}
module.exports=defineAssociations;