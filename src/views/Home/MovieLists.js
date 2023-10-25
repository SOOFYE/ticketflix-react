import React ,{useState} from 'react'
import "../../assets/MovieLists.css"


import { useNavigate } from 'react-router-dom';


function MovieLists({filterdMovie,handleChangeInMovieStatus,setActiveTab,activeTab}) {

  const navigate = useNavigate();
  
  

    const RouteToMovieInfo = (movieName)=>{
      navigate(`movie-info/${movieName}`)
  }


  const changeMovieStatus = (status) => {
    setActiveTab(status);
    console.log(status)
    handleChangeInMovieStatus(status);
  };



   

  return (
    <div className='wholePage'>

    <div className='tabs'>
    <button 
          onClick={() => changeMovieStatus("nowshowing")} 
          className={activeTab === "nowshowing" ? 'active font-semibold' : 'font-semibold'}
        >
          NOW SHOWING
        </button>
        <button 
    onClick={() => changeMovieStatus("comingsoon")} 
    className={activeTab === "comingsoon" ? 'active font-semibold' : 'font-semibold'}
>
    COMING SOON
</button>

    </div>

    <div className='movieLists'>

    {filterdMovie.length>=1?filterdMovie.map((value,index)=>(
        
    <div class=" singleMovie " key={index} onClick={()=>{RouteToMovieInfo(value.movieName)}}> 
    
      <img
          src={value.posterLink}
          alt="Movie Poster"
          className=" "
      />
      <div class="singleMovieInfo">
        <div>
          <h3 class="text-white text-md font-semibold">
            {value.movieName}
          </h3>
          <p class="text-sm text-gray-600 ">
            (English)
          </p>
        </div>
        {/* <div>
          <p class=" ml-2 text-sm text-gray-600 ">
            ({item.language})
          </p>
        </div> */}

      </div>
</div>)):<div className='NoShowTitle'>No movies currently available</div>}

    </div>


<div>

{/* <button class="viewmore group relative text-sm font-medium text-white focus:outline-none focus:ring">
                    <span
                        class="absolute inset-0 border border-yellow-500 group-active:border-yellow-500"
                    ></span>
                    <span class="block border border-yellow-500 bg-yellow-500 px-12 py-3 transition-transform active:border-yellow-500 active:bg-yellow-500 group-hover:-translate-x-1 group-hover:-translate-y-1">
                        VEW MORE
                    </span>
                </button> */}
</div>



    </div>
  )
}

export default MovieLists