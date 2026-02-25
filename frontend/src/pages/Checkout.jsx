import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const Checkout = () => {
    const { cartItems } = useCart();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [showModal, setshowModal] = useState(false);
    const [savedAddress, setSavedAddress] = useState(null);

    const type = searchParams.get("type");
    const buyNowItem = JSON.parse(localStorage.getItem("buyNowItem"));

    const checkoutItems =
        type === "buynow" && buyNowItem ? [buyNowItem] : cartItems;

    const totalAmount = checkoutItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    useEffect(() => {
        const address = JSON.parse(localStorage.getItem("userAddress"));
        if (address) {
            setSavedAddress(address);
            setshowModal(false);
        }
    }, []);

    useEffect(() => {
        const savedAddress =
            JSON.parse(localStorage.getItem("userAddress"));

        if (savedAddress) {
            setForm((prev) => ({
                ...prev,
                ...savedAddress,
            }));
        }
    }, []);



    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
        paymentMethod: "COD",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };



    const handlePlaceOrder = () => {
        if (
            !form.name ||
            !form.phone ||
            !form.address1 ||
            !form.city ||
            !form.state ||
            !form.pincode
        ) {
            alert("Please fill all required fields");
            return;
        }

        if (checkoutItems.length === 0) {
            alert("Your cart is empty");
            return;
        }

        const orderPayload = {
            orderId: `ORD-${Date.now()}`,
            userEmail: form.email || "guest",
            customer: {
                name: form.name,
                phone: form.phone,
            },
            shippingAddress: {
                address1: form.address1,
                address2: form.address2,
                city: form.city,
                state: form.state,
                pincode: form.pincode,
                country: form.country,
            },
            items: checkoutItems,
            totalAmount,
            paymentMethod: form.paymentMethod,
            status: "PLACED",
            createdAt: new Date().toISOString(),
        };



        const existingOrders =
            JSON.parse(localStorage.getItem("orders")) || [];

        localStorage.setItem(
            "orders",
            JSON.stringify([...existingOrders, orderPayload])
        );

        // ✅ Clear correct storage
        if (type === "buynow") {
            localStorage.removeItem("buyNowItem");
        } else {
            localStorage.removeItem("cartItems");
        }

        navigate("/order-success");
    };





    if (checkoutItems.length === 0) {
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
        <>
            <h1 className="text-3xl mt-8 ml-6 md:mt-14 md:ml-16 font-bold">Checkout</h1>
            <div className="pt-5 px-3 max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-20">
                {/* LEFT: FORM */}
                <div className="md:col-span-2 space-y-6 border p-4 rounded-lg">
                    <h2 className="font-semibold mb-2 border-b">Customer Details</h2>

                    <section className="flex flex-col md:flex-row md:gap-3 space-y-3 md:space-y-0">
                        <input name="name" placeholder="Full Name *" onChange={handleChange}
                            className="input w-full px-4 py-3 border border-gray-300 rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-[#8b1c62] focus:border-transparent"
                        />
                        <input name="email" placeholder="Email" onChange={handleChange}
                            className="input w-full px-4 py-3 border border-gray-300 rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-[#8b1c62] focus:border-transparent"
                        />
                        <input name="phone" placeholder="Phone *" onChange={handleChange}
                            className="input w-full px-4 py-3 border border-gray-300 rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-[#8b1c62] focus:border-transparent"
                        />
                    </section>

                    {/* ADDRESS */}
                    <section className="space-y-3 mt-6">
                        <h2 className="font-semibold mb-2">Shipping Address</h2>
                        <input name="address1" placeholder="House No., Building Name, Street / Road *" onChange={handleChange}
                            className="input w-full px-4 py-3 border border-gray-300 rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-[#8b1c62] focus:border-transparent"
                        />

                        <input name="address2" placeholder="Landmark, Area, Locality (Optional)" onChange={handleChange}
                            className="input w-full px-4 py-3 border border-gray-300 rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-[#8b1c62] focus:border-transparent"
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <input name="city" placeholder="City *" onChange={handleChange}
                                className="input w-full px-4 py-3 border border-gray-300 rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-[#8b1c62] focus:border-transparent"
                            />

                            <input name="state" placeholder="State *" onChange={handleChange}
                                className="input w-full px-4 py-3 border border-gray-300 rounded-lg
                                 focus:outline-none focus:ring-2 focus:ring-[#8b1c62] focus:border-transparent"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <input name="pincode" placeholder="Pincode *" onChange={handleChange}
                                className="input w-full px-4 py-3 border border-gray-300 rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-[#8b1c62] focus:border-transparent"
                            />
                            <input name="country" placeholder="Country" onChange={handleChange} defaultValue={form.country}
                                className="input w-full px-4 py-3 border border-gray-300 rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-[#8b1c62] focus:border-transparent"
                            />
                        </div>
                    </section>

                    {/* PAYMENT */}
                    <section>
                        <h2 className="font-semibold mb-3">Payment Method</h2>

                        <div className="space-y-3">

                            {/* CASH ON DELIVERY */}
                            <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="COD"
                                    checked={form.paymentMethod === "COD"}
                                    onChange={handleChange}
                                    className="w-5 h-5 cursor-pointer"
                                />
                                <span>Cash on Delivery (COD)</span>
                            </label>

                            {/* UPI */}
                            <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="UPI"
                                    checked={form.paymentMethod === "UPI"}
                                    onChange={handleChange}
                                    className="w-5 h-5 cursor-pointer"
                                />
                                <span>UPI (Google Pay, PhonePe, Paytm)</span>
                            </label>

                            {/* CARD */}
                            <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="CARD"
                                    checked={form.paymentMethod === "CARD"}
                                    onChange={handleChange}
                                    className="w-5 h-5 cursor-pointer"
                                />
                                <span>Credit / Debit Card</span>
                            </label>

                            {/* NET BANKING */}
                            <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="NET_BANKING"
                                    checked={form.paymentMethod === "NET_BANKING"}
                                    onChange={handleChange}
                                    className="w-5 h-5 cursor-pointer"
                                />
                                <span>Net Banking</span>
                            </label>

                            {/* WALLET */}
                            <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="WALLET"
                                    checked={form.paymentMethod === "WALLET"}
                                    onChange={handleChange}
                                    className="w-5 h-5 cursor-pointer"
                                />
                                <span>Wallets (Paytm, Amazon Pay)</span>
                            </label>

                        </div>
                    </section>

                </div>

                {/* RIGHT: SUMMARY */}
                <div className="border rounded-lg p-6 h-fit">
                    <h2 className="font-semibold mb-4">Order Summary</h2>

                    <div className="space-y-2 border-b pb-4">
                        {checkoutItems.map((item) => (
                            <div key={item.productId + item.size} className="flex justify-between text-sm">
                                <span>{item.name} × {item.quantity}</span>
                                <span>₹{item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between font-bold mt-4">
                        <span>Total</span>
                        <span>₹{totalAmount}</span>
                    </div>

                    <button
                        onClick={() => setshowModal(true)}
                        className="mt-6 w-full bg-[#ff9d00] text-white py-3 rounded-lg font-semibold"
                    >
                        Place Order
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
                    <div className="bg-white p-5 w-4/6 max-w-2xl rounded-xl shadow-lg">
                        <div className="flex justify-between border-b">
                            <div >
                                <h1 className="text-xl font-semibold">
                                    Confirm Your Delivery Address
                                </h1>
                            </div>
                            <div>
                                <button

                                    className="text-gray-500 text-sm"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        </div>

                        <div className="text-sm text-gray-700 space-y-1 mt-3 mb-6">
                            <p><b>Name:</b> {form.name}</p>
                            <p><b>Phone:</b> {form.phone}</p>
                            <p>
                                <b>Address:</b> {form.address1}, {form.address2 && `${form.address2}, `}
                                {form.city}, {form.state} - {form.pincode}
                            </p>
                            <p><b>Country:</b> {form.country}</p>
                        </div>

                        <div className="flex justify-end gap-4">
                            {/* EDIT */}
                            <button
                                onClick={() => setshowModal(false)}
                                className="px-5 py-2 border rounded-lg hover:bg-gray-100"
                            >
                                Edit
                            </button>

                            {/* SAVE & PLACE ORDER */}
                            <button
                                onClick={handlePlaceOrder}
                                className="px-6 py-2 bg-[#ff9d00] text-white rounded-lg"
                            >
                                Save & Place Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Checkout;
