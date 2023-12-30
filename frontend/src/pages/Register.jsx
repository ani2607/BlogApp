import { useState } from "react"
import { Navigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
const Register = () => {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState('');
  const [log,setLog] = useState(false);

  const registerForm = async(e)=>{
    e.preventDefault();

    try {

      const result = await fetch(`${BACKEND_URL}/register`,{

      method : "POST",
      body : JSON.stringify({username,password}),
      headers : {'Content-Type' : 'application/json'}

      })

      console.log(result.status);
      setLog(true);

      
      
    } catch (error) {

      alert('Registration failed');

      console.log("error : ", error.message);
      
    }

    setUsername('');
    setPassword('');
    
  }

  if(log){
    return <Navigate to={"/login"}  />
  }

  return (


    <div className="flex flex-col gap-y-3 border rounded-2xl   items-center  p-4 w-96 ml-[33vw] h-[70vh] mb-16 ">

      <h1 className="text-4xl mb-20 font-bold">Register</h1>

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
       className="rounded-xl text-xl  bg-cyan-500 hover:bg-gradient-to-r from-cyan-600 to-blue-600 p-2" onClick={registerForm} >
        Register
      </button>


      </form>
    </div>
  )
}

export default Register
