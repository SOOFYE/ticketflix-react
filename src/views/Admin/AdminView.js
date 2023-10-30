import React, { useState, useEffect, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import axios from 'axios'
import Loading from '../../components/Loading';
import "../../assets/adminview.css"
import styles from '../../assets/adminview.css'; // Import the CSS module
import Dropdown from '../../components/Dropdown';
import { Link, useNavigate } from 'react-router-dom';

function AdminView() {
  const [movies, setMovies] = useState([]);
  const [load,setload] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState({ value: 'nowshowing', label: 'Now Showing' }); // State to keep track of the selected value
  const navigate = useNavigate();

  const customStyles = {
    table: {
        style: {
          height: '200px',
          backgroundColor:'rgba(32,32,32,255)'
        },
      },
    headCells: {
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        textAlign: 'center', // Center align text in header cells
        color: 'white',
        backgroundColor:'rgba(32,32,32,255)'
      },
    },
    cells: {
      style: {
        fontSize: '15px',
        textAlign: 'center', // Center align text in normal cells
        backgroundColor:'rgba(32,32,32,255)',
        color:'white'
      },
    },
  };

  const customStyles2 = {

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




  const fetchMovies = async (option='nowshowing') => {
    try{
        setload(true);
        const response = await axios.get(`https://cinemareservationsystemapi.azurewebsites.net/api/Movies/status/${option}`);
        setMovies(response.data)
        console.log(response)
        setload(false);
        }catch(error){
          console.log(error)
        }
};


  useEffect(() => {
    
    fetchMovies();
  }, []);



  const columns = [
    {
      name: 'Movie Name',
      selector: row => row.movieName,
      sortable: true,
    },
    {
      name: 'Certificate',
      selector: row => row.certificate,
      sortable: true,
    },
    {
      name: 'Language',
      selector: row => row.language,
      sortable: true,
    },
    // {
    //   name: 'Release Date',
    //   selector: row => row.releaseDate,
    //   sortable: true,
    // },
    {
      name: 'Runtime',
      selector: row => row.runtime,
      sortable: true,
    },
    {
        name: 'Actions',
        cell: (row) => (
          <Dropdown
            options={[
              { value: 'edit', label: 'Edit' },
              { value: 'delete', label: 'Delete' }
            ]}
            onSelect={(option) => handleAction(option, row)}
            placeholder="..."
          />
        )
      }
  ];

  const handleAction = (option, row) => {
    if (option.value === 'edit') {
     navigate(`./edit-movie/${row.movieName}`)
      console.log(`Editing movie: ${row.movieName}`);
    } else if (option.value === 'delete') {
      // Implement delete logic here
      console.log(`Deleting movie: ${row.movieName}`);
    }
  };

  return !load? (
    <div>
    <div className='admin-header'>
    <h1>Admin View</h1>
    <div className='content-con'><Select
       options={[
            { value: 'nowshowing', label: 'Now Showing' },
            { value: 'comingsoon', label: 'Coming Soon' }
          ]}
          value={selectedStatus} // Set the selected value
          onChange={(option) => {fetchMovies(option.value);setSelectedStatus(option)}}
          placeholder="Select Status"
          className='admin-select'
          styles={customStyles2}
        />
         <Link to='./add-new-movie'><button className='add-new-button'> + Add new Movie</button></Link></div>
       
    </div>
      
    <div className='table'>
      <DataTable
        columns={columns}
        data={movies}
        // pagination
        highlightOnHover
        responsive
        customStyles={customStyles}
        
      />
      </div>  
    </div>
  ):(<Loading/>);
}

export default AdminView;
