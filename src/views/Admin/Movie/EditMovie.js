import React, { useEffect, useState } from 'react'
import { useForm, Controller,useFieldArray  } from 'react-hook-form';
import Select from 'react-select';

import "../../../assets/addmovie.css"

import axios from 'axios'

import { useParams,useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';



function EditMovie() {

  const addShowTiming = () => {
    append({ cinema: '', date: '', timings: [] });
  };

  const [cinemas, setCinemas] = useState([]);


    const { movieName } = useParams()
    const { handleSubmit, reset, control, register, watch, formState: { errors } } = useForm();
    const releaseDATEVALUE = watch('releaseDate');
    const { fields, append, remove } = useFieldArray({
      control,
      name: 'showTimings'
    });
  
  const [movieList,setMovieList] = useState([]);

  const navigate = useNavigate()


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

 
    

    const showTimingsbyCinema = data.showTimings.reduce((acc, { cinema, date, timings }) => {
      if (!acc[cinema.value]) {
        acc[cinema.value] = {};
      }
    
      acc[cinema.value][date.value] = timings.map(timing => timing.value);
    
      return acc;
    }, {});



    console.log(showTimingsbyCinema)

  
  

    const dataToSubmit = {
      movieName:data.movieName,
      posterLink:data.posterLink,
      trailer:data.trailer,
      language:data.language,
      releaseDate:data.releaseDate,
      certificate:data.certificate.value,
      runtime: data.runtimeHours.value.toString()+'h'+' '+data.runtimeMinutes.label.toString()+'m',
      genre: data.genre.map((value)=>value.value),
      overview: data.overview,
      status:data.status.value,
      showTimings: showTimingsbyCinema,
      cast:['unknown']

    }

    console.log(dataToSubmit)


    try {
      const response = await axios.put(`https://cinemareservationsystemapi.azurewebsites.net/api/Movies/${movieName}`, dataToSubmit);
      console.log(response)
      toast.success('Movie Successfully Edited', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

        navigate('/admin/view-movie')
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

  //   reset();
  //   reset({
  //     certificate: null,
  //     genre: null,
  //     status: null,
  //     runtimeHours: null,
  //     runtimeMinutes:null,
  //     showTimings: [] 
  //     // ...other fields
  // });
  };

  let dateOptions;
  if (!releaseDATEVALUE) {
      dateOptions = [{ value: null, label: 'Please Enter Release Date' }];
  } else {
      const validReleaseDate = new Date(releaseDATEVALUE);
      if (isNaN(validReleaseDate)) {
          dateOptions = [{ value: null, label: 'Invalid Release Date' }];
      } else {
          dateOptions = Array.from({ length: 30 }, (_, i) => {
              const date = new Date(validReleaseDate);
              date.setDate(validReleaseDate.getDate() + i);
              const dateString = date.toISOString().split('T')[0];
              return { value: dateString, label: dateString };
          });
      }
  }
  
  
  
  
  
  



  const fetchData = async() => {
    try {
      // setload(true);
      const response = await axios.get(`https://cinemareservationsystemapi.azurewebsites.net/api/Movies/${movieName}`)
      
      if (response.data && response.data.length > 0) {
        const movie = response.data[0]; // Assuming you want to prefill with the first movie details
        
        // Transforming data to match form's structure
        const transformedData = {
  
          movieName: movie.movieName,
          posterLink: movie.posterLink,
          trailer: movie.trailer,
          language: movie.language,
          releaseDate:movie.releaseDate,
          certificate: { value: movie.certificate, label: movie.certificate },
          runtimeHours: { value: parseInt(movie.runtime.split('h')[0]), label: parseInt(movie.runtime.split('h')[0]).toString() },
          runtimeMinutes: { value: parseInt(movie.runtime.split('h')[1].split('m')[0]), label: parseInt(movie.runtime.split('h')[1].split('m')[0]).toString() },
          genre: movie.genre.map(g => ({ value: g, label: g })),
          overview: movie.overview,
          status: { value: movie.status, label: movie.status.charAt(0).toUpperCase() + movie.status.slice(1) },
          showTimings:  Object.entries(movie.showTimings).flatMap(([cinemaName, dates]) =>
          Object.entries(dates).map(([date, timings]) => ({
            cinema: {value: cinemaName, label:cinemaName}, // This will be 'Nuplex', 'VOX', etc.
            date: {value: date, label: date},         // The specific date for the timings
            timings: timings.map(t=>({value:t,label:t}))    // The array of timings for that date
          }))
        )
        };

        console.log("hello",transformedData)
        
        reset(transformedData);
      }
  
      setMovieList(response.data);
      console.log(response);
      // setload(false);
    } catch (error) {
      console.log(error);
    }
  };

  const timingOptions = Array.from({ length: 24 }, (_, hour) =>
    Array.from({ length: 4 }, (_, quarter) => ({ 
      value: `${hour.toString().padStart(2, '0')}:${(quarter * 15).toString().padStart(2, '0')}`,
      label: `${hour.toString().padStart(2, '0')}:${(quarter * 15).toString().padStart(2, '0')}`
    }))
  ).flat();


  const validateTimings = (timings) => timings && timings.length >= 4;


  const fetchCinemas = async () => {
    try {
      const response = await axios.get(
        `https://cinemareservationsystemapi.azurewebsites.net/api/Cinema`
      );
      const ci = response.data.map((value) => ({ value: value.name, label: value.name }));

      console.log(ci);
      setCinemas(ci);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    fetchCinemas();
  },[])


  useEffect(()=>{
    fetchData();
  },[])



  return (
    <div className='form-container'>
        <div className='admin-header mb-5'>
          <h1>Edit Movie</h1> 
        </div>

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
    <label htmlFor="language">Language</label>
    <input name="language" {...register('language')} placeholder='Enter Language' required />
    </div>

    <div className="form-group">
    <label htmlFor="releaseDate">Release Date</label>
    <input type="date" name="releaseDate" {...register('releaseDate')} placeholder='Release Date' required />
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
            styles={customStyles}
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
            styles={customStyles}
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
    onClick={addShowTiming}
    className='date-button'
  >
    + Add Show Timings
  </button>
  </div>

  <div className="form-group-date">

  {fields.map((field, index) => (
    <div key={index} className="form-group">
    <label className="form-label">Cinema</label>
    <Controller
          name={`showTimings[${index}].cinema`}
          control={control}
          render={({ field }) => (
            <Select
            styles={customStyles}
              {...field}
              options={cinemas}
              placeholder="Select Cinema"
              className="form-input date-inn" 
              required
            />
          )}
        />

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
        
      </div>

      {/* For simplicity, three timing fields per date */}
      <div className="form-group-timings">
      <label className="form-label">Timings</label>
      <Controller
              name={`showTimings[${index}].timings`}
              control={control}
              rules={{ validate: validateTimings }}
              render={({ field }) => (
                <Select
                styles={customStyles}
                  {...field}
                  options={timingOptions}
                  isMulti
                  placeholder="Select Timings"
                  className="form-input"
                />
              )}
            />
            {errors.showTimings?.[index]?.timings && (
              <p>At least 4 timings must be selected</p>
            )}
            <button className='remove-button' type="button" onClick={() => remove(index)}>Remove Date</button>
      </div>
    </div>
  ))}
</div>

<button className='movie-submit-button' type='submit'>Edit Movie</button>
  </form>
  </div>
  )
}

export default EditMovie