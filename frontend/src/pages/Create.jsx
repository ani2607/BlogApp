import { useState } from "react"
import {Navigate} from "react-router-dom"

const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const Create = () => {
  const [title,setTitle] = useState('');

  const [description,setDescription] = useState('');
  const [files,setFiles] = useState('');
  const [redirect , setRedirect] = useState(false);


 async function createPost(e){
    e.preventDefault();
    const data = new FormData();
    data.set('title', title);
  
    data.set('description', description);
    data.set('file', files[0]);

    const result = await fetch(`${BACKEND_URL}/post`,{
      method : 'POST',
      body : data,
      credentials : "include"
    })

    console.log(result);
    if(result.status === 200){
      setRedirect(true);
    }
    else{
      alert("error occured while making a post ")
      
    }

    setDescription('');
   
    setTitle('');
    setFiles('');

  }

  if(redirect){
    return  <Navigate to = "/" />
  }

  return (

    <div className=" mb-64  ">
      <form className=" text-center  p-2  gap-2 justify-center flex flex-col items-center " >

        <input type="text" placeholder="title" className="w-96 rounded  p-1 outline-none bg-gray-900" value={title} onChange={(e)=> setTitle(e.target.value)} required />


        <textarea placeholder="description" className="w-96 p-2 rounded  bg-gray-900 outline-none" cols="30" rows="5" value={description} onChange={(e)=> setDescription(e.target.value)} required ></textarea>

        <input type="file" onChange={(e)=> setFiles(e.target.files)} className=" file:text-cyan-500 file:rounded  file:bg-black    mb-1 bg-gray-900  cursor-pointer w-96 h-[26px]  "  required
        />

        <button className="bg-cyan-500 w-96 p-2 rounded-xl hover:bg-green-500"   onClick={createPost}>Create Post</button>

      </form>
    </div>
  )
}


export default Create
