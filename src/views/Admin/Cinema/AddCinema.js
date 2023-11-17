import React from 'react'
import { useForm, Controller,useFieldArray } from 'react-hook-form';
import Select from 'react-select';

import "../../../assets/addmovie.css"

import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';

function AddCinema() {

  const { handleSubmit, control, register,reset,watch   } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
  });


  const customStyles = {

    control: (base, state) => ({
        ...base,
        backgroundColor: 'rgba(51,52,53,255)',
        borderColor: 'rgba(51,52,53,255)',
        color:'rgba(215,213,211,255)'

    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: 'rgba(215,213,211,255)',
  }),
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: 'rgba(215,213,211,255)', // Set your desired color for the text of the multi-value selections
  }),
  multiValue: (styles, { data }) => ({
    ...styles,
    backgroundColor: 'rgba(144,122,34,255)', 
    color:'rgba(215,213,211,255)'
  }),
 
};


const hourOptions = Array.from({ length: 24 }, (v, k) => ({ value: k, label: k.toString().padStart(2, '0') }));
const minuteOptions = Array.from({ length: 60 }, (v, k) => ({ value: k, label: k.toString().padStart(2, '0') }));


const validateShowTimings = (showTimings) => {
  const dateSet = new Set();
  for (const showTiming of showTimings) {
    // Extract the date value (assuming it's a string)
    const dateString = showTiming.date.value;

    // Check for duplicate dates
    if (dateSet.has(dateString)) {
        toast.error(`Duplicate date found: ${dateString}`);
        return false;
    }
    dateSet.add(dateString);

      // Check for duplicate timings within the same date
      const timingSet = new Set();
      for (const timing of showTiming.timings) {

        if (!(/^\d{2}:\d{2}$/.test(timing))) {
         toast.error(`Wrong timing Format: ${timing} on date ${showTiming.date.value.toString()}`); // Already in HH:MM format
          return false;
        }
          if (timingSet.has(timing)) {
              toast.error(`Duplicate timing found: ${timing} on date ${showTiming.date.value.toString()}`);
              return false;
          }
          timingSet.add(timing);
      }
  }
  return true; // validation passed
};



  const onSubmit = async (data) => {

    const dataToSubmit = {
      cinemaName:data.cinemaName,
      location:data.location,
    }

    console.log(dataToSubmit)


    try {
      const response = await axios.post('https://cinemareservationsystemapi.azurewebsites.net/api/Movies', dataToSubmit);
      console.log(response)
      toast.success('Cinema Successfully Added', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

        
    }

    reset();
   
  };





  return (
    <div className='form-container'>
        <div className='admin-header mb-5'>
          <h1>Add New Cinema</h1> 
        </div>

    <form onSubmit={handleSubmit(onSubmit)}>

    <div className="form-group">
    <label htmlFor="movieName">Cinema Name</label>
    <input name="movieName" {...register('cinemaName')} placeholder='Enter Cinema Name' required />
    </div>

    <div className="form-group">
    <label htmlFor="posterLink">Location</label>
    <input name="posterLink" {...register('location')} placeholder='Enter Location' required />
    </div>



<button className='movie-submit-button' type='submit'>Add New Cinema</button>
  </form>
  </div>
  )
}

export default AddCinema