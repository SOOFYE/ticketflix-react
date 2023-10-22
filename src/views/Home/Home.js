import React, { useEffect, useState } from 'react'
import Carasoule from './Carasoule'
import QuickBook from './QuickBook'
import MovieLists from './MovieLists'
import axios from 'axios'

function Home() {

  const [movieList,setMovieList] = useState([]);
  const [filterdMovie,setFilteredMovie] = useState([]);
  // const [movieStatus,setMovieStatus] = useState('nowshowing')



  const InitialFetchData = async()=>{
    const response = await axios.get(`https://cinemareservationsystemapi.azurewebsites.net/api/Movies/status/nowshowing`);
    setMovieList(response.data)
    setFilteredMovie(response.data)
    console.log(response)
  }


  const handleChangeInMovieStatus = async (status)=>{
    const response = await axios.get(`https://cinemareservationsystemapi.azurewebsites.net/api/Movies/status/${status}`);
    console.log(response)
    setFilteredMovie(response.data)
  }


  useEffect(()=>{
    InitialFetchData()
  },[])


  return (movieList.length>0 && filterdMovie.length>0 )? (
    <div className='mt-3'>

     <Carasoule movieList={movieList}/> 

     <QuickBook movieList={movieList} />

    <MovieLists handleChangeInMovieStatus={handleChangeInMovieStatus} filterdMovie={filterdMovie}/>
    
    
    </div>
  ):(<div></div>)
}

export default Home