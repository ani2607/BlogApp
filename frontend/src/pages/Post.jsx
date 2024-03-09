import { useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
const Post = () => {
    const {id} = useParams();
    const [postInfo,setPostInfo] = useState(null);
    const [userInfo] = useContext(UserContext)
    const [loading,setLoading] = useState(true);

    useEffect(() => {
      setLoading(true);
        fetch(`${BACKEND_URL}/post/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                setPostInfo(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        setLoading(false);
    },[id]);

    if(!postInfo) return '';

    const year = postInfo.createdAt.slice(0,4);
  const month = postInfo.createdAt.slice(5,7);
  const date = postInfo.createdAt.slice(8,10);

  if(loading){
    return <h1 className='text-center text-2xl mb-52'>Loading...</h1>
  }

  async function deletePost(){

    const result = await fetch(`${BACKEND_URL}/delete/${id}`,{
      method : "DELETE",
      
    })
    
    if(result.ok){
      alert("post deleted successfully");
    }
    else{
      alert("Error while deleting");
    }
  }
  
  return (
    <div className='mb-48 text-center w-auto m-10  flex flex-col justify-center items-center gap-y-3'>
      
      <div className="heading -mt-8  text-4xl">
        <h1>{postInfo.title}</h1>
      </div>
      <div className="userinfo flex flex-col items-center">
        <div className="time text-gray-500">
            <p>{`${date}-${month}-${year}`}</p>
        </div>
        <div className="name">
            {`by @${postInfo.author.username}`}
        </div>
      </div>
     {
        postInfo.author._id === userInfo.id && 
        (
            <div className=' rounded p-2 flex gap-x-5 '>
              <div className="edit bg-blue-800 w-14 rounded p-1">
                <Link to={`/edit/${id}`}>Edit </Link>
               </div>
               <div className="edit bg-red-600  rounded p-1">
                <Link to={'/'}>
                 <button className='w-14' onClick={deletePost} >Delete </button> 
                 </Link>
               </div>
                
            </div>

        )
     }
      
      <div className="image  ">
        <img src={`${BACKEND_URL}/${postInfo.coverImage}`} className='h-80  ' alt="" />

      </div>
      <div className="description">
        <p>
            {postInfo.description}
        </p>
      </div>


    </div>
  )
}

export default Post
