import React, {useState} from 'react';
import Select from 'react-select';


import {Ticket} from '../../assets/svg.js'

import '../../assets/quickbook.css'

function QuickBook() {
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedMovies, setSelectedMovies] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setselectedTime] = useState(null);

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
    }),
    menu: (provided) => ({
      ...provided,
      border: '1px solid black', // Black border for the menu (options dropdown)
      maxHeight: 200, // Maximum height of the dropdown
      overflowY: 'auto', // Enable vertical scrolling
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

  const cinemaOptions = [
    { value: 'c1', label: 'Cinema 1' },
    { value: 'c2', label: 'Cinema 2' },
    { value: 'c3', label: 'Cinema 3' },
    { value: 'c4', label: 'Cinema 4' },
    { value: 'c5', label: 'Cinema 5' }
    // ... other cinemas
  ];

  const dateOptions = [
    { value: '2023-10-04', label: 'October 4, 2023' },
    { value: '2023-11-10', label: 'November 10, 2023' },
    { value: '2023-12-12', label: 'December 12, 2023' }
  ];

  const movieOptions = [
    { value: 'm1', label: 'Movie 1' },
    { value: 'm2', label: 'Movie 2' },
    { value: 'm3', label: 'Movie 3' }
    // ... other movies
  ];

  const timeOptions = [
    { value: '00:00', label: '12:00 AM' },
    { value: '12:00', label: '12:00 PM:' },
    { value: '1:00', label: '1:00 AM' }
    // ... other movies
  ];

  return (
    <div className='quickbookGrid  bg-yellow-400'>

  <div>
    <h1 className='text-2xl font-bold'>Quick Book {Ticket()} </h1>
  </div>

  <div>
  <Select
          options={movieOptions}
          placeholder="Select Movie"
          onChange={setSelectedMovies}
          styles={selectStyles} //
          menuPlacement="top"
        />
  </div>

  <div>
  <Select
      options={dateOptions}
      onChange={(selectedOption) => setSelectedDate(selectedOption)}
      placeholder="Select date"
      styles={selectStyles} //
      menuPlacement="top"
      isSearchable={false}
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
    />
  </div>
  <div>
  <button
  class="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
  href="/download"
>
  <span
    class="absolute inset-0 border border-black group-active:border-black"
  ></span>
  <span
    class="block border border-black bg-black px-12 py-3 transition-transform active:border-black active:bg-black group-hover:-translate-x-1 group-hover:-translate-y-1"
  >
    BUY NOW
  </span>
</button>
  </div>


    </div>
  )
}

export default QuickBook;