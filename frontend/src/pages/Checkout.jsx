import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { notyf } from "../utils/notyf";
import { useGetCartQuery, usePlaceOrderMutation, useBuyNowOrderMutation, useCreateRazorpayOrderMutation } from "../redux/backendApi";


const Checkout = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [showModal, setshowModal] = useState(false);
    const [savedAddress, setSavedAddress] = useState(null);

    const { data, isLoading, error } = useGetCartQuery();
    const [placeOrder, { isLoading: placingOrder }] = usePlaceOrderMutation();
    const [buyNowOrder] = useBuyNowOrderMutation();
    const [createRazorpayOrder] = useCreateRazorpayOrderMutation();

    const cartItems = data?.items || [];
    const type = searchParams.get("type");
    const [buyNowQty, setBuyNowQty] = useState(
        JSON.parse(localStorage.getItem("buyNowItem") || "null")?.quantity || 1
    );
    const buyNowItem = JSON.parse(localStorage.getItem("buyNowItem") || "null");

    const productId = buyNowItem?.product?._id || buyNowItem?._id;

    const checkoutItems =
        type === "buynow" && buyNowItem ? [buyNowItem] : cartItems;

    const totalAmount = checkoutItems.reduce((sum, item) => {
        const price = item?.product?.salePrice ?? item?.salePrice ?? 0;
        return sum + price * item.quantity;
    }, 0);

    const handleQtyChange = (change) => {
        setBuyNowQty(prev => {
            const newQty = prev + change;
            if (newQty < 1 || newQty > 5) {
                notyf.error("You can only Buy 5");
                return prev; // ✅ both lines are inside the if block
            }


            // update localStorage too
            const item = JSON.parse(localStorage.getItem("buyNowItem"));
            localStorage.setItem("buyNowItem", JSON.stringify({ ...item, quantity: newQty }));

            return newQty;
        });
    };

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        houseNo: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
        paymentMethod: "COD",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    const handleRazorpayPayment = async (orderData) => {

        try {

            const { data } = await createRazorpayOrder({
                amount: totalAmount
            }).unwrap();

            const options = {
                key: data.key,
                amount: data.order.amount,
                currency: "INR",
                name: "Your Store",
                description: "Order Payment",
                order_id: data.order.id,

                handler: async function (response) {

                    console.log("Payment Success", response);

                    let res;

                    if (type === "buynow") {

                        const buyNowItem = JSON.parse(localStorage.getItem("buyNowItem"));

                        res = await buyNowOrder({
                            productId: buyNowItem.productId,
                            quantity: type === "buynow" ? buyNowQty : buyNowItem.quantity,
                            ...orderData
                        }).unwrap();

                        localStorage.removeItem("buyNowItem");

                    } else {

                        res = await placeOrder(orderData).unwrap();

                    }

                    navigate("/order-success");

                },

                prefill: {
                    name: form.fullName,
                    email: form.email,
                    contact: form.phone,
                },

                theme: {
                    color: "#ff9d00"
                }

            };

            const rzp = new window.Razorpay(options);

            rzp.open();

        } catch (error) {

            console.error("Razorpay error", error);

        }
    };

    const handlePlaceOrder = async () => {
        console.log("Type:", type);

        if (
            !form.fullName ||
            !form.phone ||
            !form.houseNo ||
            !form.city ||
            !form.state ||
            !form.pincode
        ) {
            alert("Please fill all required fields");
            return;
        }

        if (checkoutItems.length === 0) {
            alert("Cart is empty");
            return;
        }

        try {

            const orderData = {
                fullName: form.fullName,
                email: form.email,
                phone: form.phone,
                houseNo: form.houseNo,
                landmark: form.landmark,
                city: form.city,
                state: form.state,
                pincode: form.pincode,
                country: form.country,
                paymentMethod: form.paymentMethod,
            };


            const onlinePaymentMethods = ["UPI", "CARD", "NET_BANKING", "WALLET"];
            if (onlinePaymentMethods.includes(form.paymentMethod)) {
                handleRazorpayPayment(orderData);
                return;
            }

            let res;

            // ====================
            // BUY NOW ORDER
            // ====================
            if (type === "buynow") {

                const buyNowItem = JSON.parse(localStorage.getItem("buyNowItem"));
                console.log("buynowItem", cartItems);
                console.log("Sending to API:", {         // ✅ add this
                    productId: buyNowItem.productId,
                    quantity: buyNowItem.quantity,
                    ...orderData
                });
                res = await buyNowOrder({
                    productId: buyNowItem.productId,
                    quantity: type === "buynow" ? buyNowQty : buyNowItem.quantity,
                    ...orderData
                }).unwrap();
                console.log("BuyNowItem:", buyNowItem);

                localStorage.removeItem("buyNowItem");
            }

            // ====================
            // CART ORDER
            // ====================
            else {

                res = await placeOrder(orderData).unwrap();

            }

            console.log("Order Success:", res);

            navigate("/order-success");

        } catch (error) {

            console.error("Order Failed:", error);

            alert(error?.data?.message || "Failed to place order");

        }
    };

    if (isLoading) {
        return <p className="text-center py-10">Loading...</p>;
    }

    if (error) {
        return <p className="text-center py-10 text-red-500">Failed to load cart</p>;
    }






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
                        <input name="fullName" placeholder="Full Name *" onChange={handleChange}
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
                        <input name="houseNo" placeholder="House No., Building Name, Street / Road *" onChange={handleChange}
                            className="input w-full px-4 py-3 border border-gray-300 rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-[#8b1c62] focus:border-transparent"
                        />

                        <input name="landmark" placeholder="Landmark, Area, Locality (Optional)" onChange={handleChange}
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
                                    checked={form.paymentMethod === "MET_BANKING"}
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
                        {/* {checkoutItems.map((item, index) => {
                            const name = item?.product?.productName ?? item?.name;
                            const price = item?.product?.salePrice ?? item?.salePrice;

                            return (
                                <div key={item._id ?? index} className="flex justify-between text-sm">
                                    <span>{name} × {item.quantity}</span>
                                    <span>₹{price * item.quantity}</span>
                                </div>
                            );
                        })} */}

                        {checkoutItems.map((item, index) => {
                            const name = item?.product?.productName ?? item?.name;
                            const price = item?.product?.salePrice ?? item?.salePrice;
                            const qty = type === "buynow" ? buyNowQty : item.quantity;

                            return (
                                <div key={item._id ?? index} className="flex justify-between text-sm items-center">
                                    <span>{name}</span>
                                    <div className="flex items-center gap-6">
                                        <div className="flex gap-2 item-center">
                                            {type === "buynow" && (
                                                <>
                                                    {/* ✅ Quantity controls only for buynow */}
                                                    <button
                                                        onClick={() => handleQtyChange(-1)}
                                                        disabled={buyNowQty <= 1}
                                                        className="w-6 h-6 border rounded flex items-center justify-center 
                            disabled:opacity-40 hover:bg-gray-100"
                                                    >−</button>
                                                    <span>{buyNowQty}</span>
                                                    <button
                                                        onClick={() => handleQtyChange(1)}
                                                        //disabled={buyNowQty >= 5}
                                                        className="w-6 h-6 border rounded flex items-center justify-center 
                            disabled:opacity-40 hover:bg-gray-100"
                                                    >+</button>
                                                </>
                                            )}
                                            {type !== "buynow" && <span>× {qty}</span>}
                                        </div>
                                        <span>₹{price * qty}</span>
                                    </div>
                                </div>
                            );
                        })}
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
                                    onClick={() => setshowModal(false)}
                                    className="text-gray-500 text-sm"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        </div>

                        <div className="text-sm text-gray-700 space-y-1 mt-3 mb-6">
                            <p><b>Name:</b> {form.fullName}</p>
                            <p><b>Phone:</b> {form.phone}</p>
                            <p>
                                <b>Address:</b> {form.houseNo}, {form.landmark}`
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
                                disabled={placingOrder}
                                className="px-6 py-2 bg-[#ff9d00] text-white rounded-lg"
                            >
                                {placingOrder ? "Processing..." : "Save & Place Order"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Checkout;
