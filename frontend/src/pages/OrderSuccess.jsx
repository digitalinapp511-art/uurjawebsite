import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const OrderSuccess = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />

                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Order Placed Successfully!
                </h1>

                <p className="text-gray-600 mb-6">
                    Thank you for shopping with us. Your order has been placed and will be
                    processed soon.
                </p>

                <div className="space-y-3">
                    <Link
                        to="/my-orders"
                        className="block w-full bg-[#ff9d00] text-white py-3 rounded-lg font-semibold hover:opacity-90"
                    >
                        View My Orders
                    </Link>

                    <Link
                        to="/shop"
                        className="block w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-100"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
