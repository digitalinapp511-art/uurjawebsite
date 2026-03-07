import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ShopHeader from "../components/shop/ShopHeader";
// import FilterSidebar from "../components/shop/FilterSidebar";
// import MobileFilter from "../components/shop/MobileFilter";
import ProductGrid from "../components/shop/ProductGrid";
import { useGetProductsQuery } from "../redux/backendApi";

const Shop = () => {
  const { data: products = [], isLoading, error } = useGetProductsQuery();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');


  // 🔹 FILTER STATE (safe default)
  const [filters, setFilters] = useState({
    category: categoryParam ? [categoryParam] : [],
    size: [],
    color: [],
    price: { min: 0, max: 20000 },
  });

  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      category: categoryParam ? [categoryParam] : [],
    }));
  }, [categoryParam]);

  // 🔹 SORT STATE
  const [sortBy, setSortBy] = useState("featured");

  const handleFilterChange = (selectedFilters) => {
    setFilters(selectedFilters);
  };

  // 🔹 FILTER LOGIC
  const filteredProducts = products
    .filter((product) => {

      // CATEGORY
      if (
        filters.category.length &&
        !filters.category.includes(product.category)
      ) return false;

      // SIZE
      if (
        filters.size.length &&
        !filters.size.some((s) => product.sizes?.includes(s))
      ) return false;

      // COLOR
      if (
        filters.color.length &&
        !filters.color.includes(product.color)
      ) return false;

      // PRICE
      if (
        product.price < filters.price.min ||
        product.price > filters.price.max
      ) return false;

      return true;
    })

    // 🔹 SORT LOGIC
    .sort((a, b) => {
      if (sortBy === "low-high") return a.price - b.price;
      if (sortBy === "high-low") return b.price - a.price;
      if (sortBy === "featured") return b.featured - a.featured;
      return 0;
    });

  if (isLoading) return <div className="text-center py-20">Loading products...</div>;
  if (error) return <div className="text-center py-20">Failed to load products</div>;

  return (
    <div className="bg-white">
      <ShopHeader />

      <div className="mb-2">
        <img
          src="https://res.cloudinary.com/dqkssrvir/image/upload/v1772030852/flashSale1_p3auwa.png"
          onClick={() =>
            document
              .getElementById("price-section")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="cursor-pointer"
        />
      </div>

      <div className="max-w-7xl mx-auto px-2 md:px-4 lg:px-8 py-3 mb-10">
        <div className="flex h-screen overflow-hidden gap-8">

          {/* FILTERS (Desktop) */}
          {/* <div className="hidden md:block lg:block md:1/5 lg:w-1/6">
            <div className="h-full overflow-y-auto scrollbar-hide px-3">
              <FilterSidebar onFilterChange={handleFilterChange} />
            </div>
          </div> */}

          {/* PRODUCTS */}
          <div className="w-full h-full flex flex-col ">

            {/* MOBILE */}
            <div className="flex items-center justify-between mb-4 md:hidden">
              {/* <MobileFilter onFilterChange={handleFilterChange} /> */}
              <select
                className="border-2 px-2 py-2 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>

            {/* DESKTOP */}
            <div className="hidden md:flex justify-end mb-4">
              <select
                className="border-2 px-4 py-2 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide py-2 md:p-4">
              <ProductGrid products={filteredProducts} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
