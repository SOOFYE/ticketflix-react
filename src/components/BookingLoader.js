import React from 'react'
import { ProgressBar } from  'react-loader-spinner'
import "../assets/loading.css"
function BookingLoader() {
  return (
    <div className='centeredLoading' >
    <ProgressBar
  height="80"
  width="80"
  ariaLabel="progress-bar-loading"
  wrapperStyle={{}}
  wrapperClass="progress-bar-wrapper"
  borderColor = '#F4442E'
  barColor = '#51E5FF'
/>
<div className='font-bold text-white text-2xl'>Booking in Progress</div>
</div>
  )
}

export default BookingLoader