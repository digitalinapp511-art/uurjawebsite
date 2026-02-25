import { Link } from "react-router-dom";
import CloudinaryImage from "../CloudinaryImage";

const ProductGrid = ({ products = [] }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.length === 0 ? (
        <div className="col-span-full text-center py-10">
          <p className="text-gray-500 text-lg">No items found</p>
        </div>
      ) : (
        products.map((product, i) => {
          const hasDiscount =
            product.originalPrice && product.originalPrice > product.price;

          const discount = hasDiscount
            ? Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100
              )
            : null;

          return (
            <Link
              key={product.id || i}
              to={`/product/${product.id}`}
              className="border rounded-lg p-4 hover:shadow-lg transition block"
            >
              <img
                src={product.image || "placeholder"}
                alt={product.title || product.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded"
              />

              <h3 className="mt-3 font-semibold text-gray-800">
                {product.title || product.name}
              </h3>

              <div className="flex items-center gap-2 mt-1">
                <p className="text-[#d4af37] font-bold">
                  ₹{product.price}
                </p>

                {hasDiscount && (
                  <>
                    <p className="text-gray-400 text-sm line-through">
                      ₹{product.originalPrice}
                    </p>

                    <p className="text-green-500 text-sm font-medium">
                      {discount}% OFF
                    </p>
                  </>
                )}
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default ProductGrid;
