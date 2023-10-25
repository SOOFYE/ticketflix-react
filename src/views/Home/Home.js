import React, { useEffect, useState } from 'react'
import Carasoule from './Carasoule'
import QuickBook from './QuickBook'
import MovieLists from './MovieLists'
import axios from 'axios'
import Loading from '../../components/Loading'



function Home() {

  const [movieList,setMovieList] = useState([]);
  const [filterdMovie,setFilteredMovie] = useState([]);
  const [load,setload] = useState(true);
  const [activeTab, setActiveTab] = useState("");



  const InitialFetchData = async()=>{
    try{
    setload(true);
    const response = await axios.get(`https://cinemareservationsystemapi.azurewebsites.net/api/Movies/status/nowshowing`);
    setMovieList(response.data)
    setFilteredMovie(response.data)
    console.log(response)
    setload(false);
    }catch(error){
      console.log(error)
    }
  }


  const handleChangeInMovieStatus = async (status)=>{
    setload(true);
    const response = await axios.get(`https://cinemareservationsystemapi.azurewebsites.net/api/Movies/status/${status}`);
    console.log(response)
    setFilteredMovie(response.data)
    setActiveTab(status)
    setload(false);
  }


  useEffect(()=>{
    InitialFetchData()
  },[])


  return (!load)? (
    <div className='mt-3'>


     <Carasoule movieList={movieList}/> 

     <QuickBook movieList={movieList} />

    <MovieLists handleChangeInMovieStatus={handleChangeInMovieStatus} filterdMovie={filterdMovie} activeTab={activeTab} setActiveTab={setActiveTab} />
    
    
    </div>
  ):(<Loading/>)
}

export default Home