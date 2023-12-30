import { useContext, useState } from "react"
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const Login = () => {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  const [,setUserInfo] = useContext(UserContext);

  const loginForm = async(e)=>{

    e.preventDefault();

    const result = await fetch(`${BACKEND_URL}/login`,{
      method : "POST",
      body : JSON.stringify({username,password}),
      headers : {'Content-Type' : 'application/json'},
      credentials : "include"
    })

    if(result.status ===  200){
      
      const load = await result.json()
      // console.log(load);
      setUserInfo(load);
      setRedirect(true);
      
      
    }
    else{
      
      alert("wrong credentials");
      
    }

    

    setUsername('');
    setPassword('');

  }


  if(redirect){
    return <Navigate to="/" />
  }


  return (
    <div className="flex flex-col gap-y-3 border rounded-2xl   items-center  p-4 w-96 ml-[33vw] h-[70vh] mb-16 ">

      <h1 className="text-4xl mb-20 font-bold">Login</h1>

      <form className="flex flex-col gap-y-2 w-80" >

      <input type="text" className={`p-2 outline-none border border-cyan-500 bg-black rounded-xl }`}
      placeholder="username"
       value={username}
       onChange={(e)=> setUsername(e.target.value)}
       />


      <input type="password" className="p-2 rounded-xl outline-none border border-cyan-500 bg-black "
       placeholder="password"
       value={password}
       onChange={(e)=> setPassword(e.target.value)}
       
       />

      <button
       className="rounded-xl text-xl  bg-cyan-500 hover:bg-gradient-to-r from-cyan-600 to-blue-600 p-2" onClick={loginForm} >
        Login
      </button>


      </form>
    </div>
  )
}


export default Login
