import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";


const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL

const Navbar = () => {
  
  const [userInfo,setUserInfo] = useContext(UserContext)

  useEffect(()=>{

    const fetchData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/profile`, {
          credentials: 'include'
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        // console.log(data);
        setUserInfo(data);

      } catch (error) {
        console.log(BACKEND_URL)
        console.error('Error in fetching data:', error);
      }
    }

      fetchData(); 
  },[setUserInfo]);

 

  const logout = async()=>{
    await fetch(`${BACKEND_URL}/logout`,{
      method : 'POST',
      credentials : 'include'
    })
    // console.log(result);
    setUserInfo(null);
  }

  let userName = userInfo?.username

  return (
    
    <div className="flex justify-evenly gap-x-[110px] text-center  items-center p-3 mb-14 ">
      <div className="left  text-3xl font-bold hover:scale-110">
        <Link to="/">BlogApp</Link>
      </div>
      {userName && 
        <div className="right text-xl flex justify-evenly gap-x-4">
        <Link to="/create" className="hover:bg-green-500  rounded p-1 bg-cyan-500 ">
          Create
        </Link>
        <Link onClick={logout}  className="border hover:bg-green-500 rounded p-1 hover:border-green-500">
          Logout
        </Link>
      </div>
      
      }

      {!userName && 
        <div className="right text-xl flex justify-evenly gap-x-4">
        <Link to="/login" className="hover:bg-green-500  rounded p-1 bg-cyan-500 ">
          Login
        </Link>
        <Link to="/register" className="border hover:bg-green-500 rounded p-1 hover:border-green-500">
          Register
        </Link>
      </div>
      }
    </div>
  );
};

export default Navbar;
