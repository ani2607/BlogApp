import {useEffect, useState } from "react"
import {useParams,Navigate} from 'react-router-dom'

const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL


const Edit = () => {

    const {id} = useParams();
    
    const [title,setTitle] = useState('');

    const [description,setDescription] = useState('');
    const [files,setFiles] = useState('');
    const [redirect , setRedirect] = useState(false);

    useEffect(()=>{
        
        fetch(`${BACKEND_URL}/post/${id}`)
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            setTitle(data.title);
            setDescription(data.description)
            
        })
    },[id])

  async  function editPost(ev){
        ev.preventDefault();
        const data = new FormData();
    data.set('title', title);
    data.set('id',id);
  
    data.set('description', description);
    if(files?.[0]){

        data.set('file', files[0]);
    }

      const res = await  fetch(`${BACKEND_URL}/post`,{
            method : "PUT",
            body : data,
            credentials : "include"
        })

        if(res.ok){

            setRedirect(true);
        }

    
    }

    if(redirect){
        return <Navigate to={`/post/${id}`} />
    }

  return (






    <div className=" mb-64  ">
    <form className=" text-center  p-2  gap-2 justify-center flex flex-col items-center " >

      <input type="text" placeholder="title" className="w-96 rounded  p-1 outline-none bg-gray-900" value={title} onChange={(e)=> setTitle(e.target.value)} required />


      <textarea placeholder="description" className="w-96 p-2 rounded  bg-gray-900 outline-none" cols="30" rows="5" value={description} onChange={(e)=> setDescription(e.target.value)} required ></textarea>

      <input type="file" onChange={(e)=> setFiles(e.target.files)} className=" file:text-cyan-500 file:rounded  file:bg-black    mb-1 bg-gray-900  cursor-pointer w-96 h-[26px]  "  required
      />

      <button className="bg-cyan-500 w-96 p-2 rounded-xl hover:bg-green-500"   onClick={editPost}>Edit Post</button>

    </form>
  </div>
  
  )
}

export default Edit
