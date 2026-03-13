import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import { useGetCartQuery } from "../redux/backendApi";

const Cart = () => {
    const { data,isLoading, error } = useGetCartQuery();

    const cartItems = data?.items || [];
    // ✅ calculate total here
    const total = cartItems.reduce(
        (sum, item) => sum + item.product.salePrice * item.quantity,
        0
    );
    

    if (isLoading) {
        return <p className="text-center py-10">Loading products...</p>;
    }

    if (error) {
        return <p className="text-center py-10 text-red-500">Failed to load products</p>;
    }

    if (cartItems.length === 0) {
        return (
            <div className="pt-20 pb-10 text-center">
                <h2 className="text-2xl font-semibold">No items to checkout 🛒</h2>
                <p className="text-gray-500 mt-2">Please add an item first</p>
                <Link
                    to="/shop"
                    className="inline-block mt-4 w-64 bg-[#ff9d00] text-white py-3 rounded-lg font-semibold"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-10 px-4 py-10 max-w-6xl mx-auto ">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid md:grid-cols-4 gap-8">
                {/* LEFT: CART ITEMS */}
                <div className="md:col-span-2 space-y-6">
                    {cartItems.map((item,index) => (
                        <CartItem key={item.product?._id || index} item={item} />
                    ))}
                </div>

                {/* RIGHT: ORDER SUMMARY */}
                <div className="border md:col-span-2 rounded-lg p-6 h-fit">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                    {/* ITEM LIST */}
                    <div className="space-y-3 border-b pb-4 mb-4">
                        {cartItems.map((item, index) => (
                            <div
                                key={`${item.product._id}-${index}`}
                                className="flex justify-between text-sm"
                            >
                                <span className="max-w-[70%]">
                                    {item.product.productName} × {item.quantity}
                                </span>
                                <span className="font-medium">
                                    ₹{item.product.salePrice * item.quantity}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* SUBTOTAL */}
                    <div className="flex justify-between mb-2 text-sm">
                        <span>Subtotal</span>
                        <span>₹{total}</span>
                    </div>
                    <div className="flex justify-between mb-2 text-sm">
                        <span>Delivery Charge</span>
                        <span>-</span>
                    </div>

                    {/* TOTAL */}
                    <div className="flex justify-between font-bold text-lg border-t pt-3">
                        <span>Total</span>
                        <span>₹{total}</span>
                    </div>
                    <Link to="/checkout">
                        <button className="mt-6 w-full bg-[#ff9d00] text-white py-3 rounded-lg font-semibold hover:opacity-90">Proceed to Checkout</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
