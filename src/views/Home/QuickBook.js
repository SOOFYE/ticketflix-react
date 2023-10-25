import React, {useEffect, useState} from 'react';
import Select from 'react-select';



import { useNavigate } from 'react-router-dom';


import {Ticket} from '../../assets/svg.js'

import '../../assets/quickbook.css'

function QuickBook({movieList}) {
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedMovies, setSelectedMovies] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setselectedTime] = useState(null);


  const [movieOptions,setMovieOptions] = useState([])
  const [dateOptions,setDateOptions] = useState([]);
  const [timeOptions,setTimeOptions] = useState([])

  const selectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'transparent',
      borderColor: 'black', // Black border for the control (select box)
      border: '2px solid black',
      boxShadow: null,
      '&:hover': {
        borderColor: 'black', // Black border on hover
        cursor:'pointer',
      },
      fontFamily:'Kanit'
    }),
    menu: (provided) => ({
      ...provided,
      border: '1px solid black', // Black border for the menu (options dropdown)
      maxHeight: 200, // Maximum height of the dropdown
      overflowY: 'auto', // Enable vertical scrolling
      fontFamily:'Kanit'
    }),
    placeholder: (provided)=>({
      ...provided,
      color: 'black',
      fontWeight: '600',
    }),
    option: (provided, state) => ({
      ...provided,
      fontWeight: '600',
      color: state.isSelected ? 'white' : 'black',
      backgroundColor: state.isSelected ? 'black' : 'white',
    }),
    singleValue: (provided, state) => ({
      ...provided,
      fontWeight: '600',
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: 'black', // change the color of icon
    }),
    indicatorSeparator: () => ({ // removes the separator
      display: 'none',
    }),
  };



  const navigate = useNavigate();



  function convertTo12Hour(timeStr) {
    const [hours24, minutes] = timeStr.split(':');
    const hours = ((hours24 % 12) || 12).toString();
    const period = hours24 < 12 || hours24 === '24' ? 'AM' : 'PM';
    return `${hours.padStart(2, '0')}:${minutes} ${period}`;
  }


  const handleMovieSelection = (selectedOption) => {
    setSelectedMovies(selectedOption);
    const movieObject = movieList.find(value => value.movieName === selectedOption.value);
    if (movieObject) {
      const dates = Object.keys(movieObject.showTimings).map(date => ({ value: date, label: date }));
      console.log(new Date(dates[0].value).getDate(),new Date().getDate())
      const filteredDate = dates.filter((value)=>new Date(value.value)>=new Date())
      setDateOptions(filteredDate);
    }
  };

  const handleDateSelection = (selectedOption) => {
    setSelectedDate(selectedOption)
    const movieObject = movieList.find(value => value.movieName === selectedMovies.value);
    if (movieObject) {
      const times = movieObject.showTimings[selectedOption.value].map(time => ({ value: time, label: convertTo12Hour(time) }));
      let filteredTimes = times;
      if(new Date(selectedOption.value)==new Date()){
        filteredTimes = times.filter((value)=>new Date(value).getFullYear()>=new Date().getFullYear()||new Date(value).getFullYear()==new Date().getFullYear()&&new Date(value).getDate()==new Date().getDate())
      }
      setTimeOptions(filteredTimes);
    }
  };



  const BuyTickets = ()=>{

    // console.log(selectedMovies.value,selectedDate.value,selectedTime.value)

    if(selectedMovies!==null&selectedDate!==null&selectedTime!==null){

          const object ={
            movie: selectedMovies.value,
            date: selectedDate.value,
            time: selectedTime.value,
          } 
          
          navigate('/ticket-selection', {
            state: { movieSelection: object }
          });


    }


  }




  useEffect(() => {
    const movies = movieList.map(value => ({ value: value.movieName, label: value.movieName }));
    setMovieOptions(movies);  // Update this line to setMovieOptions instead of setMovies
  }, [movieList]);

  return (
    <div className='quickbookGrid'>

  <div>
    <h1 className='quickbookText'>Quick Book {Ticket()} </h1>
  </div>

  <div>
  <Select
          options={movieOptions}
          placeholder="Select Movie"
          onChange={handleMovieSelection}
          styles={selectStyles} //
          menuPlacement="top"
        />
  </div>

  <div>
  <Select
      options={dateOptions}
      onChange={handleDateSelection}
      placeholder="Select date"
      styles={selectStyles} //
      menuPlacement="top"
      isSearchable={false}
      // isDisabled={dateOptions.length<1?true:false}
    />
  </div>

  <div>
  <Select
      options={timeOptions}
      onChange={(selectedOption) => setselectedTime(selectedOption)}
      placeholder="Select time"
      styles={selectStyles} //
      menuPlacement="top"
      isSearchable={false}
      // isDisabled={timeOptions.length<1?true:false}
    />
  </div>
  <div>
  <button
  className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
  onClick={()=>BuyTickets()}
>
  <span
    className="absolute inset-0 border border-black group-active:border-black"
  ></span>
  <span
    className="block border border-black bg-black px-12 py-3 transition-transform active:border-black active:bg-black group-hover:-translate-x-1 group-hover:-translate-y-1"
  >
    BUY NOW
  </span>
</button>
  </div>


    </div>
  )
}

export default QuickBook;