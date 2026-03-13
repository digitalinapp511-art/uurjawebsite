import { useEffect, useState } from "react";
import { useGetMyOrdersQuery, useCancelOrderMutation } from "../redux/backendApi";

const MyOrders = () => {

    const [orders, setOrders] = useState([]);
    const orderSteps = ["Pending", "Processing", "Shipped", "Delivered"];
    const [cancelOrder] = useCancelOrderMutation();

    const { data, isLoading, error } = useGetMyOrdersQuery();

    const getStepIndex = (status) => {
        return orderSteps.indexOf(status);
    };

    const handleCancelOrder = async (orderId) => {
        if (!window.confirm("Are you sure you want to cancel this order?")) return;

        try {
            await cancelOrder(orderId).unwrap();
            // ✅ Update local state too so UI reflects immediately
            setOrders(prev =>
                prev.map(order =>
                    order._id === orderId
                        ? { ...order, orderStatus: "Cancelled" }
                        : order
                )
            );
        } catch (err) {
            console.error("Cancel failed:", err);
            alert("Failed to cancel order");
        }
    };

    useEffect(() => {
        if (data) {
            setOrders(data);
        }
    }, [data]);
    console.log("Orders API:", data);

    if (isLoading) {
        return <p className="text-center py-10">Loading orders...</p>;
    }

    if (error) {
        return (
            <p className="text-center py-10 text-red-500">
                Failed to load orders
            </p>
        );
    }

    // if (orders.length === 0) {
    //     return (
    //         <div className="text-center py-10">
    //             <h2 className="text-xl font-semibold">No orders found 📦</h2>
    //         </div>
    //     );
    // }



    if (orders.length === 0) {
        return (
            <div className="pt-24 text-center mb-20">
                <h2 className="text-xl font-semibold">
                    No orders found 📦
                </h2>
                <p className="text-gray-500 mt-2">
                    You haven’t placed any orders yet
                </p>
            </div>
        );
    }

    const OrderTracker = ({ status }) => {
        if (status === "Cancelled by User") {
            return <div className="mt-2 mb-10 text-red-600 font-bold text-xl text-center">❌ You cancelled this order</div>;
        }
        if (status === "Cancelled by Admin") {
            return <div className="mt-2 mb-10 text-red-600 font-bold text-xl text-center">❌ Order cancelled by Seller</div>;
        }

        const activeIndex = getStepIndex(status);

        return (
            <div className="flex items-center justify-between mt-1 mb-10 md:mt-4 md:mb-20 w-[90%]">
                {orderSteps.map((step, index) => (
                    <div
                        key={step}
                        className={`flex items-center ${index !== orderSteps.length - 1 ? "flex-1" : ""}`}
                    >

                        {/* CIRCLE */}
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                            ${index <= activeIndex
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-200 text-gray-500"
                                }`}
                        >
                            ✓
                        </div>

                        {/* LABEL */}
                        <p className={`text-xs mt-16 absolute -ml-2 
                        ${index <= activeIndex ? "text-green-600" : "text-gray-400"}
                    `}>
                            {step}
                        </p>

                        {/* LINE */}
                        {index !== orderSteps.length - 1 && (
                            <div
                                className={`flex-1 h-1 mx-2
                                ${index < activeIndex
                                        ? "bg-green-500"
                                        : "bg-gray-200"
                                    }`}
                            />
                        )}
                    </div>
                ))}
            </div>
        );
    };


    return (
        <div className="pt-8 px-4 max-w-5xl mx-auto mb-20">
            <h1 className="text-3xl font-bold mb-8">My Orders</h1>

            <div className="space-y-6">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="border rounded-lg p-6 shadow-sm"
                    >

                        {/* ORDER TRACKER */}
                        <div className="flex justify-center mb-4">
                            <OrderTracker status={order.orderStatus} />
                        </div>

                        {/* HEADER */}
                        <div className="flex justify-between mb-4 items-center">
                            <div>
                                <p className="font-semibold">
                                    Order #{order._id}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Placed on{" "}
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">

                                {/* CANCEL BUTTON */}
                                {order.orderStatus === "Pending" && (
                                    <button
                                        onClick={() => handleCancelOrder(order._id)}
                                        className="text-sm text-red-600 px-3 py-2 bg-red-200 rounded-full hover:bg-red-300"
                                    >
                                        Cancel
                                    </button>
                                )}

                            </div>
                        </div>

                        {/* ITEMS */}
                        <div className="space-y-3 border-t pt-4">
                            {order.items.map((item) => (
                                <div
                                    key={`${order._id}-${item.product}`}
                                    className="flex justify-between items-center"
                                >

                                    <div className="flex items-center gap-3">

                                        <img
                                            src={item.images}
                                            alt={item.name}
                                            className="w-12 h-14 object-cover rounded"
                                        />

                                        <div>
                                            <p className="text-sm font-medium">
                                                {item.name}
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>

                                    </div>

                                    <span className="text-sm font-medium">
                                        ₹{item.price * item.quantity}
                                    </span>

                                </div>
                            ))}
                        </div>

                        {/* ADDRESS */}
                        <div className="mt-4 text-sm text-gray-700">
                            <p className="font-medium">Delivery Address</p>

                            <p>
                                {order.shippingAddress.houseNo},{" "}
                                {order.shippingAddress.city},{" "}
                                {order.shippingAddress.state} –{" "}
                                {order.shippingAddress.pincode}
                            </p>
                        </div>

                        {/* TOTAL */}
                        <div className="flex justify-between mt-2 text-md text-gray-800">
                            <span>Payment Method</span>
                            <span>{order.paymentMethod || "COD"}</span>
                        </div>
                        <div className="flex justify-between mt-4 border-t pt-4 font-semibold">
                            <span>Total Amount</span>
                            <span>₹{order.totalAmount}</span>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
