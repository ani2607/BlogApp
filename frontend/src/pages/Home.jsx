import {  useEffect, useState } from "react";
import Info from "../components/Info";



const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL

const Home = () => {

    const [blogs,setBlogs] = useState([]);
    const [loading,setLoading] = useState(true);
    

    useEffect(()=>{
      setLoading(true);
      
      fetch(`${BACKEND_URL}/posts`)
      .then((response)=>{
        return response.json();
      })
      .then(data=>{
        setBlogs(data);
        // console.log(data);
      }).catch((err)=>{
        console.log("error : ",err.message);
      })
      setLoading(false);
    },[]);

    if(loading){
      return <h1>Loading...</h1>
    }
  
  return (
    <div className="ml-56 mr-52  ">
      {
        blogs?.length > 0 && 
        blogs.map((blog,index)=>{
            return (
                <Info
                id = {blog._id}
                heading = {blog.title}
                url = {blog.coverImage}
                username = {blog.author.username}
                createdAt = {blog.createdAt}
                description = {blog.description}
                key={index}
                />
            )
        })
      }
    </div>
  )
}

export default Home
