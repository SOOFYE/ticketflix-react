import React ,{useState} from 'react'
import "../../assets/MovieLists.css"


import { useNavigate } from 'react-router-dom';


function MovieLists({filterdMovie,handleChangeInMovieStatus}) {

  const navigate = useNavigate();
  

    const RouteToMovieInfo = (movieName)=>{
      navigate(`movie-info/${movieName}`)
  }



   

  return (
    <div className='wholePage'>

    <div className='tabs'>
  <button onClick={()=>{handleChangeInMovieStatus("nowshowing")}} className='active font-semibold'>NOW SHOWING</button>
  <button onClick={()=>{handleChangeInMovieStatus("comingsoon")}} className='font-semibold'>COMING SOON</button>
    </div>

    <div className='movieLists'>

    {filterdMovie.map((value,index)=>(
        
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
</div>))}

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