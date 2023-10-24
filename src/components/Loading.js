import React from 'react'
import { ThreeDots } from  'react-loader-spinner'
import "../assets/loading.css"


function Loading() {
  return (
    <div className='centeredLoading' >
    <ThreeDots
    
    height="100" 
    width="200" 
    radius="20"
    color="#facc15" 
    ariaLabel="three-dots-loading"
    wrapperStyle={{}}
    wrapperClassName=""
    visible={true}
     />
     </div>
  )
}

export default Loading