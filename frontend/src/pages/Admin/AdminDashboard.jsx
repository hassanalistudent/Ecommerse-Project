import Chart from 'react-apexcharts';
import { useGetUsersQuery } from '../../redux/api/usersApiSlice';
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from '../../redux/api/orderApiSlice';
import { useState, useEffect } from 'react';
import AdminMenu from './AdminMenu';
import OrderList from './OrderList';
import Loader from '../../components/Loader';

const AdminDashboard = () => {
  const { data: customers = [], isLoading: loadingUsers } = useGetUsersQuery();
  const { data: orders, isLoading: loadingOrders } = useGetTotalOrdersQuery();
  const { data: totalSales, isLoading: loadingSales } = useGetTotalSalesQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();
  console.log(salesDetail)

  const [state, setState] = useState({
    options: {
      chart: { type: 'line' },
      tooltip: { theme: 'dark' },
      colors: ['#00E396'],
      dataLabels: { enabled: true },
      stroke: { curve: 'smooth' },
      title: { text: 'Sales Trend', align: 'left' },
      grid: { borderColor: '#ccc' },
      markers: { size: 1 },
      xaxis: {
        categories: [],
        title: { text: 'Date' },
      },
      yaxis: {
        title: { text: 'Sales' },
        min: 0,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: 'Sales', data: [] }],
  });

  useEffect(() => {
  if (salesDetail) {
    const formattedSalesDate = salesDetail.map((item) => ({
      x: item._id, // already a date string like "2025-12-01"
      y: item.totalSales,
    }));

    setState((prevState) => ({
      ...prevState,
      options: {
        ...prevState.options,
        xaxis: {
          categories: formattedSalesDate.map((item) => item.x),
        },
      },
      series: [
        {
          name: 'Sales',
          data: formattedSalesDate.map((item) => item.y),
        },
      ],
    }));
  }
}, [salesDetail]);


  return (
    <div className="ml-[2rem] min-h-screen bg-gray-50 p-6">
      <div className="md:col-span-3 bg-white shadow rounded p-4 h-full">
        {/* Sidebar */}
        <div className="md:col-span-3">
          <AdminMenu />
        </div>

        {/* Main Content */}
        <div className="md:col-span-9">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div className="bg-white shadow rounded p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-600">Total Sales</h2>
              {loadingSales ? (
                <Loader />
              ) : (
                <p className="text-2xl font-bold text-green-600">
                  ${totalSales?.totalSales || 0}
                </p>
              )}
            </div>
            <div className="bg-white shadow rounded p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-600">Total Orders</h2>
              {loadingOrders ? (
                <Loader />
              ) : (
                <p className="text-2xl font-bold text-blue-600">
                  {orders?.totalOrders || 0}
                </p>
              )}
            </div>
            <div className="bg-white shadow rounded p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-600">Total Users</h2>
              {loadingUsers ? (
                <Loader />
              ) : (
                <p className="text-2xl font-bold text-purple-600">
                  {customers.length}
                </p>
              )}
            </div>
          </div>

          {/* Sales Chart */}
          <div className="bg-white shadow rounded p-6 mb-6">
            <Chart
              options={state.options}
              series={state.series}
              type="line"
              height={350}
            />
          </div>

          {/* Recent Orders */}
          <div className="bg-white shadow rounded p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            <OrderList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
