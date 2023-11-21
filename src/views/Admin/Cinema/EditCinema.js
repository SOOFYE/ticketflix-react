import React, { useEffect, useState } from 'react'
import { useForm, Controller,useFieldArray  } from 'react-hook-form';
import Select from 'react-select';

import "../../../assets/addmovie.css"

import axios from 'axios'

import { useParams,useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';



function EditCinema() {
    const { cinemaName } = useParams()
  const { handleSubmit, control, register,reset,watch  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
  });
  const [movieList,setCinemaList] = useState([]);

  const navigate = useNavigate()



const onSubmit = async (data) => {

  const dataToSubmit = {
    name:data.name,
    location:data.location,
  }

    console.log(dataToSubmit)


    try {
      const response = await axios.put(`https://cinemareservationsystemapi.azurewebsites.net/api/Cinema/${cinemaName}`, dataToSubmit);
      console.log(response)
      toast.success('Cinema Successfully Edited', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

        navigate('/admin/view-cinema')
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


  };

  
  
  
  
  
  
  



  const fetchData = async() => {
    try {
      // setload(true);
      const response = await axios.get(`https://cinemareservationsystemapi.azurewebsites.net/api/Cinema/${cinemaName}`)
      
      if (response.data) {
        const cinema = response.data; // Assuming you want to prefill with the first movie details
        
        // Transforming data to match form's structure
        const transformedData = {
          name:cinema.name,
          location:cinema.location,
        };

        console.log(transformedData);
        
        reset(transformedData);
      }
  
      
      // setload(false);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(()=>{
    fetchData();
  },[])



  return (
    <div className='form-container'>
        <div className='admin-header mb-5'>
          <h1>Edit Cinema</h1> 
        </div>

    <form onSubmit={handleSubmit(onSubmit)}>

    <div className="form-group">
    <label htmlFor="movieName">Cinema Name</label>
    <input name="movieName" {...register('name')} placeholder='Enter Cinema Name' required />
    </div>

    <div className="form-group">
    <label htmlFor="posterLink">Location</label>
    <input name="posterLink" {...register('location')} placeholder='Enter Location' required />
    </div>

<button className='movie-submit-button' type='submit'>Edit Cinema</button>
  </form>
  </div>
  )
}

export default EditCinema