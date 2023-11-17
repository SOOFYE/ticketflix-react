import React, { useState, useEffect, useCallback } from 'react';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import axios from 'axios';
import Loading from '../../../components/Loading';
import '../../../assets/adminview.css';
import Dropdown from '../../../components/Dropdown';
import { Link, useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

function BookingView() {
  const [Bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [load, setload] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState({
    value: 'nowshowing',
    label: 'Now Showing',
  }); // State to keep track of the selected value
  const navigate = useNavigate();

  const customStyles = {
    table: {
      style: {
        height: '200px',
        backgroundColor: 'rgba(32,32,32,255)',
      },
    },
    headCells: {
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        textAlign: 'center', // Center align text in header cells
        color: 'white',
        backgroundColor: 'rgba(32,32,32,255)',
      },
    },
    cells: {
      style: {
        fontSize: '15px',
        textAlign: 'center', // Center align text in normal cells
        backgroundColor: 'rgba(32,32,32,255)',
        color: 'white',
      },
    },
  };

  const customStyles2 = {
    control: (base, state) => ({
      ...base,
      backgroundColor: 'rgba(51,52,53,255)',
      borderColor: 'rgba(51,52,53,255)',
      color: 'rgba(215,213,211,255)',
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
      color: 'rgba(215,213,211,255)',
    }),
  };

  const fetchBookings = async (option = 'nowshowing') => {
    try {
      setload(true);
      const response = await axios.get(
        `https://cinemareservationsystemapi.azurewebsites.net/api/Booking`
      );
      setBookings(response.data);
      console.log(response);
      setload(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatus = (movieTime) => {
    const currentTime = new Date();
    const movieDateTime = new Date(movieTime);
    return movieDateTime > currentTime ? 'Active' : 'Expired';
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const columns = [
    {
      name: 'Booked By',
      selector: (row) => row.userId,
      sortable: true,
    },
    {
      name: 'Movie',
      selector: (row) => row.movieName,
      sortable: true,
    },
    {
      name: 'Date',
      selector: (row) => row.movieDate,
      sortable: true,
    },
    {
      name: 'time',
      selector: (row) => row.movieTime,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => getStatus(row.movieTime),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <Dropdown
          options={[
            { value: 'edit', label: 'Edit' },
            { value: 'view', label: 'View' },
          ]}
          onSelect={(option) => handleAction(option, row)}
          placeholder="Action"
          className='z-1'
        />
      ),
    },
  ];

  const handleAction = (option, row) => {
    if (option.value === 'view') {
      navigate(`/admin/detail-booking/${row.id}`);
    } 
  };

  // Loadash debounce function
  const debouncedSearch = useCallback(
    debounce(async (searchValue) => {

      try {
        setload(true);
        const response = await axios.get(
          `https://cinemareservationsystemapi.azurewebsites.net/api/Booking?searchuser=${searchValue}`
        );
        setBookings(response.data);
        console.log(response);
        setload(false);
      } catch (error) {
        console.log(error);
      }

      
    }, 500), // 500ms debounce time
    []
  );

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Bookings</h1>
        <div className="content-con form-group">
        <input
        type="text"
        placeholder="Search by username"
        value={searchTerm}
        onChange={handleSearchChange}
        className="form-input" // Use your custom class for styling
      />
          {/* <Select
            options={[
              { value: 'nowshowing', label: 'Now Showing' },
              { value: 'comingsoon', label: 'Coming Soon' },
            ]}
            value={selectedStatus} // Set the selected value
            onChange={(option) => {
              fetchMovies(option.value);
              setSelectedStatus(option);
            }}
            placeholder="Select Status"
            className="admin-select"
            styles={customStyles2}
          /> */}
          {/* <Link to="/admin/add-new-movie">
            <button className="add-new-button"> + Add New Movie</button>
          </Link> */}
        </div>
      </div>

      <div className="table">
        <DataTable
          columns={columns}
          data={Bookings}
          // pagination
          highlightOnHover
          responsive
          customStyles={customStyles}
          progressPending={load}
          progressComponent={<Loading />}
        />
      </div>
    </div>
  );
}

export default BookingView;
