import React from 'react'
import Carasoule from './Carasoule'
import QuickBook from './QuickBook'
import WhatsOn from './WhatsOn'
function Home() {
  return (
    <div className='mt-3'>

    {/* <div id="nowshowing" className='text-6xl font-black '>
        What's New on Screen
    </div> */}
     <Carasoule/> 
     <QuickBook/>
    {/* <WhatsOn/> */}
    
    
    </div>
  )
}

export default Home