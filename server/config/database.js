const {Sequelize}=require('sequelize');

const sequelize=new Sequelize('fullStackProject','root','Nikhith@123',{
    dialect:"mysql",
    host:"localhost"
})

module.exports=sequelize;
