import { Link } from 'react-router-dom';
import { useGetOrdersQuery } from '../../redux/api/orderApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import AdminMenu from './AdminMenu';


const MyOrders = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error?.data?.message || 'Failed to load orders'}</Message>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-6xl bg-white shadow-md rounded p-6">
        <h1 className="text-2xl font-bold mb-6">All Orders</h1>

        {orders.length === 0 ? (
          <Message>No orders found</Message>
        ) : (
          <table className="w-full table-auto border-collapse">
            <AdminMenu/>
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4">IMAGE</th>
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">DATE</th>
                <th className="py-2 px-4">TOTAL</th>
                <th className="py-2 px-4">PAID</th>
                <th className="py-2 px-4">DELIVERED</th>
                <th className="py-2 px-4">X</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="py-2 px-4">
                    <img
                      src={order.orderItems[0]?.image}
                      alt={order.orderItems[0]?.name}
                      className="w-12 h-12 object-cover"
                    />
                  </td>
                  <td className="py-2 px-4">{order._id}</td>
                  <td className="py-2 px-4">{order.createdAt.substring(0, 10)}</td>
                  <td className="py-2 px-4">${order.totalPrice}</td>
                  <td className="py-2 px-4">
                    {order.isPaid ? (
                      <span className="bg-green-400 font-semibold rounded-full text-white px-2 py-1">Completed</span>
                    ) : (
                      <span className="bg-red-400 font-semibold rounded-full text-white px-2 py-1">Pending</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {order.isDelivered ? (
                      <span className="bg-green-400 font-semibold rounded-full text-white px-2 py-1">Delivered</span>
                    ) : (
                      <span className="bg-red-400 font-semibold rounded-full text-white px-2 py-1">On the way</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    <Link
                      to={`/order/${order._id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
