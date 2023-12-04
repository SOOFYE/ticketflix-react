// import React, { useEffect, useState } from 'react';
// import axios from 'axios'; // Make sure to import axios
// import { Bar } from 'react-chartjs-2';
// import 'chart.js/auto';


// function prepareChartData(dataArray) {

//   console.log("NIGA",dataArray)
//   if (!dataArray || dataArray.length === 0) {
//     return { data: {}, options: {} };
//   }

//   const dates = dataArray.map(item => item.date);
//   const sales = dataArray.map(item => item.sales);
//   const totalRevenue = dataArray.map(item => item.totalRevenue / 1000); // Assuming revenue is in thousands for better scale in the chart

//   const data = {
//     labels: dates,
//     datasets: [
//       {
//         label: 'Sales',
//         data: sales,
//         backgroundColor: 'rgba(255, 99, 132, 0.5)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1
//       },
//       {
//         label: 'Total Revenue (in thousands)',
//         data: totalRevenue,
//         backgroundColor: 'rgba(54, 162, 235, 0.5)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 1
//       }
//     ]
//   };

//   const options = {
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   };

//   return { data, options };
// }



// function Dashboard() {
//   const [cinemaName, setCinemaName] = useState('nuplex');
//   const [data, setData] = useState({});
//   const [options, setOptions] = useState({});

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`https://cinemareservationsystemapi.azurewebsites.net/api/Booking/totalTicketSales/${cinemaName}`);
//       console.log(response);

//       const { data: chartData, options: chartOptions } = prepareChartData(response.data);
//       console.log(JSON.stringify(chartData, null, 2));
//       setData(chartData);
//       setOptions(chartOptions);
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//       // Handle the error appropriately here
//     }
//   }

//   useEffect(() => {
//     fetchData();
//   }, []); // Dependency array includes cinemaName

//   return (
//     <div>
//       {data && options && <Bar data={data} options={options} />}
//     </div>
//   );
// }

// export default Dashboard;