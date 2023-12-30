import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL

const Info = ({id, url, heading, username, createdAt, description }) => {

  const year = createdAt.slice(0,4);
  const month = createdAt.slice(5,7);
  const date = createdAt.slice(8,10);
  
  const imageUrl = url ? `${BACKEND_URL}/${url}` : ''; 
  return (


    <div className="flex justify-evenly items-center mb-16 h-48  ">
      <div className="left ">

        <Link to={`/post/${id}`} >
        <img src={imageUrl} className='w-72' alt="img" />
        </Link>
        

      </div>

      <div className="right flex flex-col  gap-y-2 justify-start w-[260px] h-[155px] -mt-4 ">
        <div className="heading text-xl font-bold  ">
          <Link to={`/post/${id}`} >
            {heading}
            </Link>
            </div>
        <div className="basicInfo flex  gap-x-10 ">
          <div className="username text-zinc-300">{username}</div>
          <div className="createdAt text-gray-600">{`${date}-${month}-${year}`}</div>
        </div>
        <div className="description  "><p>{description.slice(0,50)}</p></div>
      </div>
    </div>
  );
};

export default Info;

Info.propTypes = {
  id : PropTypes.string,
  url: PropTypes.string,
  heading: PropTypes.string,
  username: PropTypes.string,
  createdAt: PropTypes.string,
  description: PropTypes.string,
};
