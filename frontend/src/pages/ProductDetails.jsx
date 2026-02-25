import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import { useParams } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  if (!product) {
    return <div className="text-center py-20">Product not found</div>;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-8 mt-10 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">

          {/* LEFT: IMAGE */}
          <div className="h-auto">
            <ProductGallery key={product.id} images={product.images} />
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
          {products
            .filter((p) => p.id !== product.id)
            .slice(0, 8)
            .map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
        </div>
      </div>
    </>

  );
};

export default ProductDetails;
