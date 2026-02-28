import { useState } from "react";
// import SizeSelector from "./SizeSelector";
import { useCart } from "../../context/CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
    FaTruck,
    FaGlobeAsia,
    FaCheckCircle,
    FaTag,
    FaCopy,
    FaCheck,
} from "react-icons/fa";
import { notyf } from "../../utils/notyf";

const ProductInfo = ({ product }) => {
    const { addToCart } = useCart(); // ✅ IMPORTANT
    // const [selectedSize, setSelectedSize] = useState(null);
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();

    const couponCode = "UURJA03";

    const discount = product.originalPrice && Math.round
        (
            ((product.originalPrice - product.salePrice) / product.originalPrice) * 100
        );

    const handleCopy = () => {
        navigator.clipboard.writeText(couponCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    const location = useLocation();

    const handleAddToCart = () => {
        const user = localStorage.getItem("user");
        if (!user) {
            const next = encodeURIComponent(location.pathname + location.search);
            navigate(`/login?next=${next}`);
            return;
        }

        const finalSize = product.sizes?.[0] || null;
        addToCart(product, finalSize, 1);

        const cartItem = {
            id: product.id,
            name: product.name,
            salePrice: product.salePrice,
            image: product.images?.[0],
            size: finalSize,
            quantity: 1,
            availableSizes: product.sizes,
        };
        notyf.success("Added to Cart");
        // NEXT STEP: send this to Cart Context / backend
    };


    const handleBuyNow = () => {
        const user = localStorage.getItem("user");
        if (!user) {
            const next = encodeURIComponent(location.pathname + location.search);
            navigate(`/login?next=${next}`);
            return;
        }

        // if (!selectedSize) {
        //     return;
        // }

        const buyNowItem = {
            productId: product.id,
            name: product.name,
            salePrice: product.salePrice,
            originalPrice: product.originalPrice,
            image: product.image,
            size: product.sizes?.[0] || null,
            quantity: 1,
        };

        localStorage.setItem(
            "buyNowItem",
            JSON.stringify(buyNowItem)
        );

        navigate("/checkout?type=buynow");
    };



    return (
        <div>
            {/* TITLE */}
            <h1 className="font-heading text-3xl tracking-wide mb-3">
                {product.name}
            </h1>

            <p className="text-gray-600 tracking-wide mb-6">
                {product.description}
            </p>

            {/* PRICE */}
            <div className="mb-4" id="price-section">
                <div className="flex items-center gap-4 mb-2">
                    <span className="text-2xl font-semibold text-[#ff9d00]">
                        ₹ {product.salePrice.toLocaleString("en-IN")}
                    </span>

                    {product.originalPrice && (
                        <>
                            <span className="line-through text-gray-400">
                                ₹ {product.originalPrice.toLocaleString("en-IN")}
                            </span>

                            <span className="text-white text-sm font-medium bg-[#e57373] px-2 py-0.5 rounded">
                                {discount}% OFF
                            </span>
                        </>
                    )}
                </div>

                {product.originalPrice && (
                    <div className="text-lg mt-3">
                        <p className="text-[#007900] font-medium">
                            Save ₹{" "}
                            {(product.originalPrice - product.salePrice).toLocaleString("en-IN")}
                        </p>
                        <p className="text-gray-500 text-sm tracking-wide">
                            Inclusive of all taxes
                        </p>
                    </div>
                )}
            </div>

            {/* SIZE SELECTOR */}
            {/* <SizeSelector
                sizes={product.sizes}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
            /> */}

            {/* ADD TO CART */}
            <div className="mt-5 border-t py-5">
                <p className="text-sm px-1 text-gray-600 tracking-wider mb-1">
                    500K+ Happy Customers | 1 Million+ Followers
                </p>

                <div className="mt-5 grid grid-cols-2 gap-4">
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-[#ff9d00] text-white py-3 tracking-widest font-bold rounded-xl hover:opacity-90 transition"
                    >
                        Add to Cart
                    </button>

                    <div className="relative group">
                        <button
                            onClick={handleBuyNow}
                            // disabled={!selectedSize}
                            className={`w-full py-3 font-bold rounded-xl transition-all bg-[#ff9d00] text-white cursor-pointer hover:bg-[#e57373]`}
                        >
                            Buy Now
                        </button>

                        {/* Tooltip that shows on hover when size is not selected */}
                        {/* {!selectedSize && (
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 
                            bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity 
                            duration-200 whitespace-nowrap pointer-events-none">
                                Select size first
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 
                                border-transparent border-t-gray-800"></div>
                            </div>
                        )} */}
                    </div>




                </div>
            </div>

            {/* ADDITIONAL OFFERS */}
            <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Additional Offers</h3>

                <div className="space-y-3">
                    <div className="border border-dashed rounded-lg p-4 flex gap-3">
                        <FaTag className="text-[#ff9d00] mt-1" />
                        <div className="flex-1">
                            <p className="font-semibold">BUY 1 GET 1 FREE</p>
                            <p className="text-sm text-gray-600">
                                Buy 1 Get 1 FREE on Prepaid Orders
                            </p>

                            <div className="flex items-center gap-2 mt-2 text-sm">
                                <span>
                                    Use Coupon Code:
                                    <span className="font-semibold ml-1">{couponCode}</span>
                                </span>

                                <button
                                    onClick={handleCopy}
                                    className={`flex items-center gap-1 border border-dashed px-2 py-0.5 rounded transition
                  ${copied
                                            ? "bg-green-600 text-white border-green-600"
                                            : "text-[#ff9d00] hover:bg-[#ff9d00] hover:text-white"
                                        }`}
                                >
                                    {copied ? (
                                        <>
                                            <FaCheck size={12} /> Copied
                                        </>
                                    ) : (
                                        <>
                                            <FaCopy size={12} /> Copy Code
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="border border-dashed rounded-lg p-4 flex gap-3">
                        <FaTag className="text-[#ff9d00] mt-1" />
                        <div>
                            <p className="font-semibold">FLAT 15% OFF</p>
                            <p className="text-sm text-gray-600">
                                Automatically Applied on Checkout
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* OFFER BANNER */}
            {/* <div className="py-5">
                <CloudinaryImage
                    publicId="flashSale2"
                    width={800}
                    height={400}
                    onClick={() =>
                        document
                            .getElementById("price-section")
                            ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="cursor-pointer"
                />
            </div> */}

            {/* DELIVERY INFO */}
            <div className="mt-6 space-y-3 text-lg text-gray-700">
                <div className="flex items-center gap-3">
                    <FaTruck className="text-[#ff9d00]" />
                    <span>Free Shipping on Prepaid & COD</span>
                </div>

                <div className="flex items-center gap-3">
                    <FaGlobeAsia className="text-[#ff9d00]" />
                    <span>Worldwide Shipping Available</span>
                </div>

                <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-500" />
                    <span>In Stock</span>
                </div>
            </div>

            {/* ACCORDIONS */}
            <div className="mt-8 space-y-3 text-sm">
                <details className="border-b pb-2 cursor-pointer">
                    <summary className="font-medium">Delivery & Shipping</summary>
                    <p className="mt-2 text-gray-600">
                        Delivered within 5–7 business days.
                    </p>
                </details>

                <details className="border-b pb-2 cursor-pointer">
                    <summary className="font-medium">Return & Exchange</summary>
                    <p className="mt-2 text-gray-600">
                        Easy 7-day return and exchange available.
                    </p>
                </details>

                <details className="border-b pb-2 cursor-pointer">
                    <summary className="font-medium">Care Instructions</summary>
                    <p className="mt-2 text-gray-600">
                        Hand wash separately. Do not bleach.
                    </p>
                </details>
            </div>
        </div>
    );
};

export default ProductInfo;
