import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import { useGetProductsQuery, useGetProductByIdQuery } from "../redux/backendApi";
// import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetProductByIdQuery(id);
  const { data: products = [] } = useGetProductsQuery();
  const product = data;


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;
  if (!product) return <div>Product not found</div>;


  return (
    <>
      <div className="max-w-7xl mx-auto px-8  mt-10 pt-4 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">

          {/* LEFT: IMAGE */}
          <div className="h-auto">
            <ProductGallery key={product._id} product={product} />
          </div>

          {/* RIGHT: PRODUCT INFO (SCROLLABLE) */}
          <div className="h-[900px] scrollbar-hide  overflow-y-auto">
            <ProductInfo product={product} />
          </div>

        </div>
      </div>
      <div className="mt-5 bg-[#faf5f7] px-8 py-10">
        <h2 className="text-2xl text-center tracking-wider font-heading mb-6">
          You may also like
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 ">
          {products?.length > 0 &&
            products
              .filter((p) => p._id !== product._id)
              .slice(0, 8)
              .map((item) => (
                <ProductCard key={item._id} product={item} />
              ))
          }
        </div>
      </div>
    </>

  );
};

export default ProductDetails;
