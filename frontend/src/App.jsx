import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Create from "./pages/Create";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Post from "./pages/Post";
import Edit from "./pages/Edit";

function App() {
  return (  
    <div className="text-white container">
      <Router>
        <Navbar />
       
        <Routes>

          <Route exact path="/" element = {<Home/>}/>
          <Route  path ="/login" element = {<Login/>}/>
          <Route  path ="/register" element = {<Register/>}/>
          <Route  path ="/create" element = {<Create/>}/>
          <Route  path ="/post/:id" element = {<Post/>} />
          <Route path ="/edit/:id" element = {<Edit/>} />
          
        </Routes>
        
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
