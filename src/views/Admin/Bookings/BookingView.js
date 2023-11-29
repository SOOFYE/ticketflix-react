import React, { useState, useEffect, useCallback } from 'react';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import axios from 'axios';
import Loading from '../../../components/Loading';
import '../../../assets/adminview.css';
import Dropdown from '../../../components/Dropdown';
import { Link, useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import Swal from 'sweetalert2';
import NoData from '../../../components/NoData';

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
        height: '900px',
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
    }, noData: {
      style: {
        backgroundColor: 'rgba(32,32,32,255)', // Consistent background color for no data state
        color: 'white',
        padding: '24px',
        textAlign: 'center',
        height: '300px',
      },
    },progress: {
      style: {
        backgroundColor: 'rgba(32,32,32,255)',
        color: 'white',
        // ... additional styles if needed
      },
    },
  };

 
  const fetchBookings = async (option = 'nowshowing') => {
    try {
      setload(true);
      const response = await axios.get(
        `https://cinemareservationsystemapi.azurewebsites.net/api/Booking`
      );
      setBookings(response.data);
      console.log(response)
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
      selector: (row) => row.booking?.userEmail,
      sortable: true,
    },
    {
      name: 'Movie',
      selector: (row) => row.booking.movieName,
      sortable: true,
    },
    {
      name: 'Date',
      selector: (row) => row.booking.movieDate,
      sortable: true,
    },
    {
      name: 'time',
      selector: (row) => row.booking.movieTime,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => getStatus(row.booking.movieTime),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <Dropdown
          options={[
            { value: 'view', label: 'View' },
            { value: 'delete', label: 'Delete' },
          ]}
          onSelect={(option) => handleAction(option, row)}
          placeholder="Action"
          className='z-1'
        />
      ),
    },
  ];

  const handleAction = async (option, row) => {
    if (option.value === 'view') {
      navigate(`/admin/detail-booking/${row.bookingId}`);
    } 
    if (option.value === 'delete') {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            // Your delete logic here
            const response = await axios.delete(`https://cinemareservationsystemapi.azurewebsites.net/api/Booking/${row.bookingId}`)
            Swal.fire(
              'Deleted!',
              'Booking has been deleted.',
              'success'
            )
            fetchBookings();
          } catch (error) {
            Swal.fire(
              'Error!',
              'There was an error deleting the record.',
              'error'
            )
          }
        }
      });
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
        {/* <div className="content-con form-group">
        <input
        type="text"
        placeholder="Search by username"
        value={searchTerm}
        onChange={handleSearchChange}
        className="form-input" // Use your custom class for styling
      />

        </div> */}
      </div>

      <div className="table">
        <DataTable
          columns={columns}
          data={Bookings}
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
