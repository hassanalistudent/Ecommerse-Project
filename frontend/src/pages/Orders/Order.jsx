import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetOrderDetailsQuery, useDeliverOrderMutation,useMarkAsPaidByAdminMutation } from "../../redux/api/orderApiSlice";

const Order = () => {
    const { id: orderId } = useParams();
    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
    const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
    const { userInfo } = useSelector((state) => state.auth);
    const [markAsPaid, { isLoading: loadingPaid }] = useMarkAsPaidByAdminMutation();

    const deliverHandler = async () => {
        await deliverOrder(orderId);
        refetch();
    };
    

    const markAsPaidHandler = async () => {
        await markAsPaid(orderId);
        refetch();
    };

    if (isLoading) return <Loader />;
    if (error) return <Message variant="danger">{error?.data?.message || "Error loading order"}</Message>;

    return (


        <div className="flex justify-center items-start min-h-screen bg-gray-50 p-6">
            <div className="w-full max-w-6xl">

                {/* Header Section */}
                <div className="border border-gray-300 p-4 rounded mb-6 bg-white shadow">
                    <h1 className="text-2xl font-bold mb-2">Order Details</h1>
                    <p><strong>Order ID:</strong> {order._id}</p>
                    <p><strong>User:</strong> {order.user.username}</p>
                    <p><strong>Email:</strong> {order.user.email}</p>
                </div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* LEFT COLUMN: Order Items */}
                    <div className="border border-gray-300 p-4 rounded bg-white shadow">
                        <h2 className="text-xl font-semibold mb-4">Order Items</h2>
                        {order.orderItems.length === 0 ? (
                            <Message>Order is empty</Message>
                        ) : (
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.orderItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                                            </td>
                                            <td>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </td>
                                            <td>{item.qty}</td>
                                            <td>${item.price.toFixed(2)}</td>
                                            <td>${(item.qty * item.price).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* RIGHT COLUMN: Summary + Shipping + Payment */}
                    <div className="flex flex-col gap-6">

                        {/* Order Summary */}
                        <div className="border border-gray-300 p-4 rounded bg-white shadow">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                            <p><strong>Items:</strong> ${order.itemsPrice}</p>
                            <p><strong>Shipping:</strong> ${order.shippingPrice}</p>
                            <p><strong>Tax:</strong> ${order.taxPrice}</p>
                            <p><strong>Total:</strong> ${order.totalPrice}</p>
                        </div>

                        {/* Shipping Info */}
                        <div className="border border-gray-300 p-4 rounded bg-white shadow">
                            <h2 className="text-xl font-semibold mb-4">Shipping</h2>
                            <p><strong>Name:</strong> {order.user.username}</p>
                            <p><strong>Email:</strong> {order.user.email}</p>
                            <p>
                                {order.shippingAddress.address}, {order.shippingAddress.city},
                                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>
                        </div>

                        {/* Payment Info */}
                        <div className="border border-gray-300 p-4 rounded bg-white shadow">
                            <h2 className="text-xl font-semibold mb-4">Payment</h2>
                            <p><strong>Method:</strong> {order.paymentMethod}</p>
                            <p><strong>Status:</strong> {order.isPaid ? "Paid" : "Not Paid"}</p>

                            {!order.isPaid && (
                                <Message variant="warning">
                                    Payment method is not setup. This is just a demo UI.
                                </Message>
                            )}
                            {loadingDeliver && <Loader />}
                            {userInfo && userInfo.isadmin && !order.isPaid && (
                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600"
                                        onClick={markAsPaidHandler}
                                    >
                                        Mark As Paid
                                    </button>
                                </div>
                            )}


                            {/* Admin-only Deliver Button */}
                            {loadingDeliver && <Loader />}
                            {userInfo && userInfo.isadmin && !order.isDelivered && (
                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="bg-pink-500 text-white w-full py-2 rounded hover:bg-pink-600"
                                        onClick={deliverHandler}
                                    >
                                        Mark As Delivered
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
