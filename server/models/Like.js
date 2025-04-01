const sequelize=require('../config/database');
const {DataTypes}=require('sequelize');
const Like=sequelize.define('Like',{},{timestamps:true})

module.exports=Like;