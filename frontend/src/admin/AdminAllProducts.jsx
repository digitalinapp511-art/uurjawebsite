import { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiFilter, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import productsData from "../data/products";

const AdminAllProducts = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deleteLoading, setDeleteLoading] = useState(null);
    const navigate = useNavigate();

    // Fetch all products
    useEffect(() => {
        fetchProducts();
    }, []);

    // Filter products when category changes
    useEffect(() => {
        if (selectedCategory === "all") {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(
                products.filter((product) => product.category === selectedCategory)
            );
        }
    }, [selectedCategory, products]);

    const fetchProducts = () => {
        try {
            setLoading(true);

            setProducts(productsData);
            setFilteredProducts(productsData);

            const uniqueCategories = [
                ...new Set(productsData.map((product) => product.category)),
            ].filter(Boolean);

            setCategories(uniqueCategories);
            setLoading(false);
        } catch (err) {
            console.error("Error loading products:", err);
            setError("Failed to load products");
            setLoading(false);
        }
    };

    const handleDelete = (productId) => {
        if (!window.confirm("Are you sure you want to delete this product?")) {
            return;
        }

        setProducts((prev) => prev.filter((p) => p.id !== productId));
    };

    const handleEdit = (productId) => {
        navigate(`/admin/edit-product/${productId}`);
    };

    const clearFilter = () => {
        setSelectedCategory("all");
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8b1c62] mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading products...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center text-red-600">
                    <p className="text-xl">{error}</p>
                    <button
                        onClick={fetchProducts}
                        className="mt-4 px-6 py-2 bg-[#8b1c62] text-white rounded-lg hover:bg-[#73154f]"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    {/* <h1 className="text-3xl font-bold text-[#ff9d00] mb-2">
                        All Products
                    </h1> */}
                    <p className="text-gray-600">
                        Manage your product inventory ({filteredProducts.length} products)
                    </p>
                </div>

                {/* Filter Section */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                            <FiFilter className="text-gray-500" />
                            <span className="font-medium text-gray-700">Filter by Category:</span>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                            <button
                                onClick={() => setSelectedCategory("all")}
                                className={`px-4 py-2 rounded-lg font-medium transition ${selectedCategory === "all"
                                    ? "bg-[#ff9d00] text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                All Categories
                            </button>

                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-lg font-medium transition ${selectedCategory === category
                                        ? "bg-[#ff9d00] text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}

                            {selectedCategory !== "all" && (
                                <button
                                    onClick={clearFilter}
                                    className="px-3 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition flex items-center gap-1"
                                >
                                    <FiX /> Clear
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <p className="text-gray-500 text-lg">No products found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
                            >
                                {/* Product Image */}
                                <div className="relative aspect-square bg-gray-100">
                                    {product.images && product.images[0] ? (
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            No Image
                                        </div>
                                    )}

                                    {/* Category Badge */}
                                    <div className="absolute top-2 left-2">
                                        <span className="bg-[#8b1c62] text-white text-xs px-3 py-1 rounded-full">
                                            {product.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-1 truncate">
                                        {product.name}
                                    </h3>

                                    <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                                        {product.description}
                                    </p>

                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-lg font-bold text-[#8b1c62]">
                                            ₹{product.price}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Stock: {product.stock || 0}
                                        </p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(product.id)}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                        >
                                            <FiEdit2 /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            disabled={deleteLoading === product.id}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {deleteLoading === product.id ? (
                                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                            ) : (
                                                <>
                                                    <FiTrash2 /> Delete
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminAllProducts;