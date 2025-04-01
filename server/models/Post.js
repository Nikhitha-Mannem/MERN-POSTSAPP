const sequelize=require('../config/database');
const {DataTypes}=require('sequelize');

const Post=sequelize.define('Post',{
    title:{
        type:DataTypes.STRING,
        allowNull:false,

    },
    postText:{
        type:DataTypes.STRING,
        allowNull:false,
        
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        
    },
    likesCount:{
        type:DataTypes.INTEGER,
        defaultValue:0
    }
},
    {timestamps:true},
)

module.exports=Post;