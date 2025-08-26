import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    "Total Users": 4000,
    "Total Sales": 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    "Total Users": 3000,
    "Total Sales": 1398,
    amt: 2210,
  },
  {
    name: 'Mar',
    "Total Users": 2000,
    "Total Sales": 9800,
    amt: 2290,
  },
  {
    name: 'Apr',
    "Total Users": 2780,
    "Total Sales": 3908,
    amt: 2000,
  },
  {
    name: 'May',
    "Total Users": 1890,
    "Total Sales": 4800,
    amt: 2181,
  },
  {
    name: 'June',
    "Total Users": 2390,
    "Total Sales": 3800,
    amt: 2500,
  },
  {
    name: 'July',
    "Total Users": 3490,
    "Total Sales": 4300,
    amt: 2100,
  },
  {
    name: 'Aug',
    "Total Users": 3490,
    "Total Sales": 4300,
    amt: 2100,
  },
  {
    name: 'Sep',
    "Total Users": 2490,
    "Total Sales": 4300,
    amt: 200,
  },
  {
    name: 'Sep',
    "Total Users": 1490,
    "Total Sales": 1300,
    amt: 1100,
  },
  {
    name: 'Sep',
    "Total Users": 3490,
    "Total Sales": 2300,
    amt: 2100,
  },
  {
    name: 'Sep',
    "Total Users": 5490,
    "Total Sales": 3100,
    amt: 2100,
  },
];

const Charts = () => {
  const [chartData, setChartData] = useState("")
  return (
    <div className='card bg-white my-4 p-4 shadow-md sm:rounded-lg '>
      <div className="flex items-center justify-between px-5 py5 mb-1">
        <h2 className='text-[20px] font-[600]'>Total Users & Total Sales</h2>
      </div>
      <div className="flex items-center gap-4 px-5 py5 mb-4">
        <span className='flex items-center gap-1'>
          <span className='block w-[7px] h-[7px] rounded-full bg-green-600'></span>
          Total Users
        </span>
        <span className='flex items-center gap-1'>
          <span className='block w-[7px] h-[7px] rounded-full bg-blue-600'></span>
          Total Sales
        </span>
      </div>
      <div className=''>
        <LineChart
          width={1000}
          height={400}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke='none' />
          <XAxis dataKey="name" tick={{fontSize: 12}}/>
          <YAxis tick={{fontSize: 12}}/>
          <Tooltip />
          <Legend />
          
          <Line type="monotone" dataKey="Total Sales" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2}/>
          <Line type="monotone" dataKey="Total Users" stroke="#82ca9d" strokeWidth={2}/>
        </LineChart>


      </div>
    </div>
  );
};

export default Charts;