// import { FiArrowRight } from "react-icons/fi";
// import { Link } from "react-router-dom";

// const ProductCard = ({ product }) => {
//     if (!product) return null;

//     const image =
//         product.image || product.images?.[0] || "/placeholder.png";

//     const discount =
//         product.originalPrice &&
//         Math.round(
//             ((product.originalPrice - product.price) /
//                 product.originalPrice) *
//             100
//         );

//     return (
//         <Link to={`/product/${product.id}`} className="block">
//             <div className="bg-white rounded-xl md:shadow-md md:hover:shadow-xl transition overflow-hidden">

//                 {/* IMAGE */}
//                 <div className="relative overflow-hidden group mt-0 sm:mt-5">
//                     <img
//                         src={image}
//                         alt={product.name}
//                         className="w-full h-64 sm:h-72 object-contain
//                        group-hover:scale-105 transition duration-300"
//                     />
//                 </div>

//                 {/* CONTENT */}
//                 <div className="p-2 md:p-3 text-center">
//                     <h3 className="font-heading text-lg md:mb-1">
//                         {product.name}
//                     </h3>

//                     {/* PRICE */}
//                     <div className="flex justify-center gap-2 items-center mb-2">
//                         <span className="text-[#000000] font-semibold">
//                             ₹ {product.price.toLocaleString("en-IN")}
//                         </span>

//                         {product.originalPrice && (
//                             <>
//                                 <span className="line-through text-gray-400 text-sm">
//                                     ₹ {product.originalPrice.toLocaleString("en-IN")}
//                                 </span>
//                                 <span className="text-green-600 text-sm font-medium">
//                                     {discount}% OFF
//                                 </span>
//                             </>
//                         )}
//                     </div>

//                     {/* CTA (NOT a button) */}
//                     {/* <div
//                         className="flex items-center justify-center gap-2 w-full py-2
//                        border border-[#ff9d00] text-[#000000]
//                        rounded-lg hover:bg-[#ff9d00]
//                        hover:text-white transition group"
//                     >
//                         View Details
//                         <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
//                     </div> */}
//                 </div>
//             </div>
//         </Link>
//     );
// };

// export default ProductCard;



import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    if (!product) return null;

    // ✅ Cloudinary Image URL
    const imagePublicId =
        product.image || product.images?.[0];

    const image = imagePublicId
        ? `https://res.cloudinary.com/dqkssrvir/image/upload/f_auto,q_auto,c_fill,w_400,h_400/${imagePublicId}.jpg`
        : "/placeholder.png";

    const discount =
        product.originalPrice &&
        Math.round(
            ((product.originalPrice - product.price) /
                product.originalPrice) *
            100
        );

    return (
        <Link to={`/product/${product.id}`} className="block">
            <div className="bg-white rounded-xl md:shadow-md md:hover:shadow-xl transition overflow-hidden">

                {/* IMAGE */}
                <div className="relative overflow-hidden group mt-0 sm:mt-5">
                    <img
                        src={image}
                        alt={product.name}
                        className="w-full h-64 sm:h-72 object-contain
                       group-hover:scale-105 transition duration-300"
                    />
                </div>

                {/* CONTENT */}
                <div className="p-2 md:p-3 text-center">
                    <h3 className="font-heading text-lg md:mb-1">
                        {product.name}
                    </h3>

                    {/* PRICE */}
                    <div className="flex justify-center gap-2 items-center mb-2">
                        <span className="text-[#000000] font-semibold">
                            ₹ {product.price.toLocaleString("en-IN")}
                        </span>

                        {product.originalPrice && (
                            <>
                                <span className="line-through text-gray-400 text-sm">
                                    ₹ {product.originalPrice.toLocaleString("en-IN")}
                                </span>
                                <span className="text-green-600 text-sm font-medium">
                                    {discount}% OFF
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;