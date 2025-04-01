const sequelize=require('../config/database');
const {DataTypes}=require('sequelize');
const Comment=sequelize.define('Comment',{
    comment:{
        type:DataTypes.STRING,
        allowNull:false
    }


},{timestamps:true})

module.exports=Comment;