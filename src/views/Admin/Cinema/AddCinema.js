import React from 'react'
import { useForm, Controller,useFieldArray } from 'react-hook-form';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

import "../../../assets/addmovie.css"

import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';

function AddCinema() {

  const navigate = useNavigate();

  const { handleSubmit, control, register,reset,watch   } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
  });


  const onSubmit = async (data) => {

    const dataToSubmit = {
      name:data.name,
      location:data.location,
    }

    console.log(dataToSubmit)


    try {
      const response = await axios.post('https://cinemareservationsystemapi.azurewebsites.net/api/Cinema', dataToSubmit);
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
    <input name="movieName" {...register('name')} placeholder='Enter Cinema Name' required />
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