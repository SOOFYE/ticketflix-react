import React from 'react'
import { useForm, Controller,useFieldArray  } from 'react-hook-form';
import Select from 'react-select';

import "../../assets/addmovie.css"

import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';

function AddMovies() {

  const { handleSubmit, control, register } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'showTimings'
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

  const onSubmit = async (data) => {

    console.log(data.showtimings)

    if (data.showTimings.length === 0 || data.showTimings===undefined) {

      toast.error('Movie needs to have a Show Timing specified.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });;

        return
  }

    console.log(data)

    let processedShowTimingsObject = {}
    

    for (const value of data.showTimings){

      processedShowTimingsObject[value.date.value] = value.timings; 

    }

    

    const dataToSubmit = {
      _id: data.movieName,
      movieName:data.movieName,
      posterLink:data.posterLink,
      tailer:data.trailer,
      certificate:data.certificate.value,
      runtime: data.runtimeHours.value.toString()+'h'+' '+data.runtimeMinutes.label.toString()+'m',
      genre: data.genre.map((value)=>value.value),
      overview: data.overview,
      status:data.status.value,
      showTimings: processedShowTimingsObject,
      cast:['unknown']

    }

    console.log(dataToSubmit)


    try {
      const response = await axios.post('', data);
      console.log(response)
      toast.success('Movie Successfully Added', {
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
      toast.error('Error occured at the server side', {
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
    // const formattedData = {
    //   ...data,
    //   showTimings: data.showTimings.reduce((acc, curr) => {
    //     acc[curr.date] = curr.timings.filter(timing => timing);  // filter out any falsy values (e.g., undefined)
    //     return acc;
    //   }, {})
    // };
    // console.log(formattedData);
  };

  const dateOptions = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dateString = date.toISOString().split('T')[0];
    return { value: dateString, label: dateString };
  });



  return (
    <div className='form-container'>

    <form onSubmit={handleSubmit(onSubmit)}>

    <div className="form-group">
    <label htmlFor="movieName">Movie Name</label>
    <input name="movieName" {...register('movieName')} placeholder='Enter movie title' required />
    </div>

    <div className="form-group">
    <label htmlFor="posterLink">Poster ID</label>
    <input name="posterLink" {...register('posterLink')} placeholder='Enter poster ID' required />
    </div>


    <div className="form-group">
    <label htmlFor="trailer">Trailer ID</label>
    <input name="trailer" {...register('trailer')} placeholder='Enter trailer ID' required />
    </div>

    <div className="form-group">
    <label htmlFor="certificate">Certificate</label>
    <Controller
      name="certificate"
      control={control}
      render={({ field }) => (
        <Select
        styles={customStyles}
          {...field}
          placeholder="Select age group"
          options={[
            { value: 'G', label: 'General Audience' },
            { value: 'PG', label: 'Parental Guidance' },
            { value: 'PG-13', label: 'Parents Strongly Cautioned' },
            { value: 'R', label: 'Restricted' },
            { value: 'NC-17', label: 'Adults Only' },
            { value: 'U', label: 'Universal' },
            { value: '12A', label: '12A - Suitable for 12 years and over' },
            { value: '15', label: 'Suitable only for 15 years and over' },
            { value: '18', label: 'Suitable only for adults' },
            { value: 'NR', label: 'Not Rated' },
            { value: 'UR', label: 'Unrated' },
            // ... other options ...
          ]}
          required
        />
      )}
    />
    </div>


    <div className="form-group">
        <label htmlFor="runtime">Runtime</label>
        
        <Controller
          name="runtimeHours"
          control={control}
          rules={{ required: "Runtime hours is required" }}
          render={({ field }) => (
            <Select
              {...field}
              className='hours-input'
              options={hourOptions}
              isSearchable={false}
              placeholder="Hours"
            />
          )}
        />
       
        
        <Controller
          name="runtimeMinutes"
          control={control}
          rules={{ required: "Runtime minutes is required" }}
          render={({ field }) => (
            <Select
              {...field}
              className='mins-input'
              options={minuteOptions}
              isSearchable={false}
              placeholder="Minutes"
            />
          )}
        />
       
      </div>

    <div className="form-group">
    <label htmlFor="genre">Genre</label>
    <Controller
      name="genre"
      control={control}
      render={({ field }) => (
        <Select
          styles={customStyles}
          {...field}
          isMulti
          placeholder="Select all genre"
          options={[
            { value: 'Action', label: 'Action' },
            { value: 'Adventure', label: 'Adventure' },
            { value: 'Animation', label: 'Animation' },
            { value: 'Biography', label: 'Biography' },
            { value: 'Comedy', label: 'Comedy' },
            { value: 'Crime', label: 'Crime' },
            { value: 'Documentary', label: 'Documentary' },
            { value: 'Drama', label: 'Drama' },
            { value: 'Family', label: 'Family' },
            { value: 'Fantasy', label: 'Fantasy' },
            { value: 'Film Noir', label: 'Film Noir' },
            { value: 'History', label: 'History' },
            { value: 'Horror', label: 'Horror' },
            { value: 'Music', label: 'Music' },
            { value: 'Musical', label: 'Musical' },
            { value: 'Mystery', label: 'Mystery' },
            { value: 'Romance', label: 'Romance' },
            { value: 'Sci-Fi', label: 'Sci-Fi' },
            { value: 'Short Film', label: 'Short Film' },
            { value: 'Sport', label: 'Sport' },
            { value: 'Superhero', label: 'Superhero' },
            { value: 'Thriller', label: 'Thriller' },
            { value: 'War', label: 'War' },
            { value: 'Western', label: 'Western' },
            // ... other options ...
          ]}
          required
        />
      )}
    />
    </div>

    <div className="form-group">
    <label htmlFor="overview">Overview</label>
    <textarea name="overview" {...register('overview')} placeholder='Enter the synopsis of the movie' required />
    </div>



    <div className="form-group">
    <label htmlFor="status">Status</label>
    <Controller
      name="status"
      control={control}
      render={({ field }) => (
        <Select
          styles={customStyles}
          {...field}
          placeholder="Select current showing status"
          options={[
            { value: 'nowshowing', label: 'Now Showing' },
            { value: 'comingsoon', label: 'Coming Soon' },
          ]}
          required
        />
      )}
    />
    </div>

    {/* For showTimings, a custom input component would be ideal to handle dynamic date and time entries */}
    <div className="form-group">

    <button
    type="button"
    onClick={() => append({ date: '', timings: [] })}
    className='date-button'
  >
    + Add Show Timings
  </button>
  </div>

<div className="form-group-date">
  {/* <button
    type="button"
    onClick={() => append({ date: '', timings: [] })}
    className='date-button'
  >
    + Add Show Timings
  </button> */}

  {fields.map((field, index) => (
    <div key={field.id} className="form-group">

      <div className="form-group-header">
      <label htmlFor={`showTimings[${index}].date`} className="form-label">Date</label>
      <Controller
        name={`showTimings[${index}].date`}
        control={control}
        render={({ field }) => (
          <Select
            styles={customStyles}
            {...field}
            placeholder='Select date'
            options={dateOptions}
            className="form-input date-inn"
            required
          />
        )}
      />
        <button className='remove-button' type="button" onClick={() => remove(index)}>Remove Date</button>
      </div>

      {/* For simplicity, three timing fields per date */}
      <div className="form-group-timings">
        {['Timing 1', 'Timing 2', 'Timing 3','Timing 4'].map((label, timingIndex) => (
          <div className="timing-group" key={timingIndex}>
            <label htmlFor={`showTimings[${index}].timings[${timingIndex}]`} className="form-label">{label}</label>
            <input
              name={`showTimings[${index}].timings[${timingIndex}]`}
              {...register(`showTimings[${index}].timings[${timingIndex}]`)}
              defaultValue={field.timings[timingIndex]}  // make sure to set up defaultValue
              className="form-input time-inn"
              placeholder="HH:mm "
              required
            />
          </div>
        ))}
      </div>
    </div>
  ))}
</div>

<button className='movie-submit-button' type='submit'>Add New Movie</button>
  </form>
  </div>
  )
}

export default AddMovies