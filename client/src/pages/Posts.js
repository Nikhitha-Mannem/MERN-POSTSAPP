import {useState,useEffect} from 'react';
import axios from 'axios';
import styles from './Posts.module.css'
import { useNavigate } from 'react-router-dom';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
//import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';

const Posts=()=>{
    const [postsList,setPostsList]=useState([]);
    const [likedPostsIds,setLikedPostsIds]=useState([])
    
    
    const navigate=useNavigate();
  useEffect(()=>{
    axios.get("http://localhost:3001/posts/",{headers:{"accessToken":localStorage.getItem("accessKey")}})
    .then((response)=>{
      if(response.data.Error){
        alert(response.data.Error);
      }
      else{
        const userLikedPosts=response.data.userLikedPosts;
        const likedPostsIds=userLikedPosts.map(post=>post.id);
        setPostsList(response.data.postsList);
        setLikedPostsIds(likedPostsIds);

      }
      

    })
    .catch(err=>console.log(err))

  },[])

  const handleLikes=(postId)=>{
    axios.post("http://localhost:3001/posts/like",{postId:postId},
    {headers:{"accessToken":localStorage.getItem("accessKey")}})
    .then(response=>{
      if(response.data.Error){
        alert(response.data.Error)
      }
      else{
        
        const userLikedPosts=response.data.userLikedPosts;
        console.log("LikedPosts are",userLikedPosts);
        const likedPostsIds=userLikedPosts.map(post=>post.postId);
        console.log("LikedPostsIds are",likedPostsIds);
        setPostsList(response.data.postsList);
        setLikedPostsIds(likedPostsIds);
      }

    })
    .catch(error=>console.log(error));
}
  

  return (
    <div className="App">
        {postsList.map((post,index)=>{
          return(
          <div className={styles.post} key={post.id} >
            <h2 className={styles.postTitle}>{post.title}</h2>
            <p className={styles.postText} onClick={()=>navigate(`/aboutPost/${post.id}`)}>{post.postText}</p>
            <div className={styles.footer}>
              <span className={styles.username}>Posted by: {post.username}</span>
              <div className={styles.likesContainer}>
                <ThumbUpAltIcon onClick={() => handleLikes(post.id)} className={likedPostsIds.includes(post.id) ? styles.liked : styles.notLiked} />
                <span className={styles.likes}>{post.likesCount}</span>
              </div>
            </div>
            
          </div>)
        })}

      
      
      
    </div>)
}
export default Posts;