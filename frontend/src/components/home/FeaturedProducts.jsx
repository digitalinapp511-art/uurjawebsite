import ProductCard from "../ProductCard";
// import products from "../../data/products";
import { useGetProductsQuery } from "../../redux/backendApi";

const FeaturedProducts = () => {
  const { data: products = [], isLoading, error } = useGetProductsQuery();
  // const featuredProducts = products.filter((product) => product.featured);
  // console.log("Data:",featuredProducts);

  if (isLoading) {
    return <p className="text-center py-10">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">Failed to load products</p>;
  }

  return (
    <section className="py-6 md:py-12 bg-[#faf5f7]">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <h2 className="text-3xl font-heading text-center mb-2">
          Featured Products
        </h2>
        <p className="text-center text-gray-600 mb-5 md:mb-10">
          Handpicked styles just for you
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;
