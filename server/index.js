const express=require('express');
const app=express();
const cors=require('cors');
const defineAssociations=require('./models/Associations');
require('dotenv').config();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const sequelize=require('./config/database');
const Post=require('./models/Post');
const Comment=require('./models/Comment');
const User=require('./models/User');
//routes
const postsRouter=require('./routes/postsRouter');
const commentsRouter=require('./routes/commentsRouter');
const authRouter=require('./routes/authRouter');


app.use('/posts',postsRouter);
app.use('/comments',commentsRouter);
app.use('/auth',authRouter);

defineAssociations();
sequelize.sync({force:true})
.then(()=>app.listen(3001,()=>console.log("server is running on port 3001...")))
.catch(err=>console.log(err));

