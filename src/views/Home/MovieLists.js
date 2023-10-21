import React ,{useState} from 'react'
import "../../assets/MovieLists.css"




function MovieLists() {


  

    const movieListt = [
        {movieName:'Spider-Man: Homecoming',language:'English'},
        {movieName:'Blaze and the Monster Machines ',language:'English'},
        {movieName:'Mission Impossible',language:'English'},
        {movieName:'Nigga Impossible',language:'English'},
        {movieName:'yolo Impossible',language:'English'},
        {movieName:'Venom',language:'English'},
        {movieName:'Spiderman',language:'English'},
        {movieName:'Mission Impossible',language:'English'},

    ]



   

  return (
    <div className='wholePage'>

    <div className='tabs'>
  <button className='active font-semibold'>NOW SHOWING</button>
  <button className='font-semibold'>COMING SOON</button>
    </div>

    <div className='movieLists'>

    {movieListt.map((item,index)=>(
        
    <div class=" singleMovie " key={index}> 
    
      <img
          src="https://i.imgur.com/TucaNwI.jpg"
          alt=""
          className=" "
      />
      <div class="singleMovieInfo">
        <div>
          <h3 class="text-white text-md font-semibold">
            {item.movieName}
          </h3>
          <p class="text-sm text-gray-600 ">
            ({item.language})
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

<button class="viewmore group relative text-sm font-medium text-white focus:outline-none focus:ring">
                    <span
                        class="absolute inset-0 border border-yellow-500 group-active:border-yellow-500"
                    ></span>
                    <span class="block border border-yellow-500 bg-yellow-500 px-12 py-3 transition-transform active:border-yellow-500 active:bg-yellow-500 group-hover:-translate-x-1 group-hover:-translate-y-1">
                        VEW MORE
                    </span>
                </button>
</div>



    </div>
  )
}

export default MovieLists