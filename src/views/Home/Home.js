import React, { useEffect, useState } from 'react'
import Carasoule from './Carasoule'
import QuickBook from './QuickBook'
import MovieLists from './MovieLists'
import axios from 'axios'

function Home() {

  const [movieList,setMovieList] = useState([{}]);
  const [movieStatus,setMovieStatus] = useState('nowshowing')

  const fetchData = async ()=>{
    const data = await axios.get(`URL?status=${movieStatus}`);
    setMovieList(data)

  }



  useEffect(()=>{
    console.log('hellow world')
  },[])


  return (
    <div className='mt-3'>
     <Carasoule movieList={movieList}/> 
     <QuickBook/>
    <MovieLists/>
    
    
    </div>
  )
}

export default Home